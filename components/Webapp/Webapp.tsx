import {BackHandler, Dimensions, Linking, Text, View} from "react-native";
import WebView, {WebViewMessageEvent, WebViewNavigation} from "react-native-webview";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ExpoNotifications from "@/components/ExpoNotifications/ExpoNotifications";
import {isInternalURL} from "@/util/isInternalURL";
import About from "@/components/About/About";
import Error from "@/components/Error/Error";
import {useURL} from "expo-linking";
import {useRouter} from "expo-router";
import {NotificationsListener} from "@/components/Webapp/NotificationsListener";
import * as Notifications from "expo-notifications";
import {rewriteExpoURL} from "@/components/Webapp/rewriteExpoURL";

/**
 * Enable a fake URL bar to debug the URL we're visiting.
 */
const ENABLE_URL_BAR = false

/**
 * Typed message so that the react-native client knows how to handel this message.
 *
 * This is teh standard pattern of how to handle postMessage with multiple uses.
 */
type TypedData<Data> = {
  type: string;
  data: Data;
};

/**
 * The actual user info that the client needs.
 */
type UserInfo = {
  userId: number;
  knockJWT: string;
  // darkMode: 'dark' | 'light';
};

type ModeType = 'about' | 'web'

type TouchStartGesture = {
  start: number;
  startY: 0;
}

export default function Webapp() {

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
  const expoURL = useURL()
  const [url, setUrl] = useState<string>(rewriteExpoURL(expoURL))
  const router = useRouter()

  const [mode, setMode] = useState<ModeType>('web');
  const touchStart = useRef<TouchStartGesture>({start: 0, startY: 0});
  const [error, setError] = useState<string | undefined>(undefined);
  const webViewRef = useRef<WebView | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<Notifications.PermissionStatus | undefined>(undefined);

  const notificationsListener = useMemo(() => {

    const postMessage = (msg: string) => {
      if (webViewRef.current) {
        webViewRef.current.postMessage(msg)
      }
    }

    return new NotificationsListener(postMessage, status => {
      console.log("Got listener notification permission status: " + status)
      setNotificationStatus(status);
    });
  }, [])

  console.log("expoURL: " + expoURL)
  console.log("URL: " + url)

  const retryWebview = () => {
    setError(undefined);
  }

  useEffect(() => {

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {

      if (webViewRef.current) {
        console.log("Handling back button!")

        // goBack might be good if we're not within the common.xyz site so we
        // can bail out of auth pages but there's also no UI for this yet.
        // webViewRef.current.goBack();
        // webViewRef.current.postMessage(JSON.stringify({
        //   type: 'navigate-back'
        // }));

        // this is a better implementation I think. It should work with react
        // nav history in our app too because that's regular 'history' plus
        // the user can back out of auth.
        webViewRef.current.goBack();

      } else {
        console.warn("No webview")
      }

      // TODO , return false if we can go back...

      return true;
    });

    return () => backHandler.remove();
  }, []);

  const changeURL = useCallback((url: string) => {
    setUrl(url)
  }, []);

  const handleTouchStart = (event: any) => {
    touchStart.current = {
      start: Date.now(),
      startY: event.nativeEvent.pageY}
    ;
  };

  // Touch End
  const handleTouchEnd = (event: any) => {
    const touchEndY = event.nativeEvent.pageY;
    const swipeDistance = touchStart.current.startY - touchEndY;
    const duration = Math.abs(touchStart.current.start - Date.now());

    const { height } = Dimensions.get("window");

    if (swipeDistance > (height * 0.85)) {

      if (duration > 3000) {
        console.log("Got about page gesture... loading about page.")
        setMode('about');
      } else {
        console.log("too soon: " + duration)
      }
    }
  };

  const handleMessage = (event: WebViewMessageEvent) => {

    notificationsListener.handleMessage(event)

    const msg = JSON.parse(event.nativeEvent.data);

    if (msg.type === 'about') {
      setMode('about')
      return;
    }

    if (msg.type === 'log') {
      console.log("Got log from React Webview: ", msg.data)
    }

    if (msg.type === 'user') {
      console.log("Got message: ", msg)
      const userData = msg as TypedData<UserInfo>;

      if (userData.data) {
        console.log("Working with user: " + userData.data.userId)
        setUserInfo(userData.data)
      }
      return;
    }

  }

  const handleNavigation = useCallback((event: WebViewNavigation) => {
    // TODO: we're given a 'navigationType' for why these are used and
    // it might help us approve some of them.
    console.log("handleNavigation: ", event)
    // Check if the URL is an external URL
    if (!isInternalURL(event.url)) {
      Linking.openURL(event.url)
        .catch(console.error)
      return false; // Prevent the WebView from loading this URL
    }
    return true; // Allow the WebView to load the URL
  }, []);

  if (error) {
    return <Error error={error} onRetry={retryWebview}/>;
  }

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {ENABLE_URL_BAR && (
          <View style={Styles.textContainer}>
            <Text>expoURL url: {expoURL}</Text>
            <Text>url: {url}</Text>
          </View>
        )}

        {mode === 'about' && (
          <>
            <About onClose={() => setMode('web')}
                   userId={userInfo?.userId}
                   knockJWT={userInfo?.knockJWT}
                   url={url}/>
          </>
        )}

        {mode === 'web' && (
          <>
            {url && (
              <WebView source={{ uri: url }}
                       ref={webViewRef}
                       sharedCookiesEnabled={true}
                       onMessage={event => handleMessage(event)}
                       onShouldStartLoadWithRequest={handleNavigation}
                       webviewDebuggingEnabled={__DEV__}
                       onError={(event) => setError(event.nativeEvent.description)}
                       allowsBackForwardNavigationGestures={true}
                       javaScriptCanOpenWindowsAutomatically={true}
                       style={{ flex: 1 }} />
            )}

            {notificationStatus === 'granted' && userInfo && userInfo.userId !== 0 && (
              <ExpoNotifications userId={userInfo.userId} knockJWT={userInfo.knockJWT} onLink={changeURL}/>
            )}
          </>
        )}

      </View>
    </>
  );
}

const Styles = {
  textContainer: {
    backgroundColor: 'red', color: 'white'
  }
} as const
