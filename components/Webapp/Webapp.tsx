import {ActivityIndicator, BackHandler, Dimensions, Linking, View} from "react-native";
import WebView, {WebViewMessageEvent, WebViewNavigation} from "react-native-webview";
import React, {useCallback, useEffect, useRef, useState} from "react";
import ExpoNotifications from "@/components/ExpoNotifications/ExpoNotifications";
import {isInternalURL} from "@/util/isInternalURL";
import About from "@/components/About/About";
import Error from "@/components/Error/Error";
import {config} from "@/util/config";
import {AuthRequested} from "@/hooks/AuthRequested";
import MAIN_APP_URL = config.MAIN_APP_URL;

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

function removeBuildString(input: string): string {
  // remove the react-native-webview build string from the UA.
  const pattern = / Build\/UP1A\.[0-9]+\.[0-9]+; wv/;
  return input.replace(pattern, '');
}

type ModeType = 'about' | 'web'

type TouchStartGesture = {
  start: number;
  startY: 0;
}

type Props = {
  onAuthStarted: () => void
  authRequested: AuthRequested | undefined;
}

export default function Webapp(props: Props) {

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
  const [url, setUrl] = useState<string | undefined>(MAIN_APP_URL)

  const [mode, setMode] = useState<ModeType>('web');
  const touchStart = useRef<TouchStartGesture>({start: 0, startY: 0});
  const [error, setError] = useState<string | undefined>(undefined);

  const [authRequested, setAuthRequested] = useState<AuthRequested | undefined>(props.authRequested);

  const webViewRef = useRef<WebView | null>(null);

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

      return true;
    });

    return () => backHandler.remove();
  }, []);

  const navigateToLink = useCallback((link: string) => {

    console.log("navigating to link: " + link)

    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({
        type: 'navigate-to-link',
        link
      }));
    }
  }, [url])

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

  const handlePushMessage = (event: WebViewMessageEvent) => {

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

    if (msg.type === 'auth-started') {
      // this will cause the UI to unmount the webview, then starte the auth
      // process on the local device.
      props.onAuthStarted()
    }

    if (msg.type === 'auth-ready') {

      // what will happen now is that the react bridge ont the client, will tell
      // the mobile app to auth... then the webapp will finish the process.

      if (authRequested) {
        console.log("Got auth-ready message, sending auth request")
        webViewRef.current?.postMessage(JSON.stringify({
          type: 'auth-request',
          bearer: authRequested.bearer
        }))

        setAuthRequested(undefined);
      } else {
        console.log("Got auth-ready message, but no auth request so not logging in yet.")
      }

    }

  }

  const handleNavigation = useCallback((event: WebViewNavigation) => {
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
            <WebView source={{ uri: MAIN_APP_URL }}
                     ref={webViewRef}
                     onMessage={event => handlePushMessage(event)}
                     onShouldStartLoadWithRequest={handleNavigation}
                     webviewDebuggingEnabled={__DEV__}
                     onError={(event) => setError(event.nativeEvent.description)}
                     allowsBackForwardNavigationGestures={true}
                     style={{ flex: 1 }} />

            {userInfo && userInfo.userId !== 0 && (
              <ExpoNotifications userId={userInfo.userId} knockJWT={userInfo.knockJWT} onLink={navigateToLink}/>
            )}
          </>
        )}

      </View>
    </>
  );
}
