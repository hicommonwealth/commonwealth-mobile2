import {BackHandler, Dimensions, Linking, Text, View} from "react-native";
import WebView, {WebViewMessageEvent, WebViewNavigation} from "react-native-webview";
import React, {useCallback, useEffect, useRef, useState} from "react";
import ExpoNotifications from "@/components/ExpoNotifications/ExpoNotifications";
import {isInternalURL} from "@/util/isInternalURL";
import About from "@/components/About/About";
import Error from "@/components/Error/Error";
import {config} from "@/util/config";
import {useURL} from "expo-linking";
import {useRouter} from "expo-router";

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

type Props = {
}

export default function Webapp(props: Props) {

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
  const expoURL = useURL()
  const url = rewriteExpoURL(expoURL)
  const router = useRouter()

  const [mode, setMode] = useState<ModeType>('web');
  const touchStart = useRef<TouchStartGesture>({start: 0, startY: 0});
  const [error, setError] = useState<string | undefined>(undefined);

  console.log("expoURL: " + expoURL)
  console.log("URL: " + url)

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

  const changeURL = useCallback((url: string) => {

    // rewriteExpoURL
    //router.push({href: url})

  }, [router]);

  // const changeURL = useCallback((url: string) => {
  //
  //   Alert.alert(
  //     'FIXME: Got a URL', // Title
  //     'URL' + url, // Message
  //     [
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           // FIXME: this code should be the entire changeURL function when we
  //           // have fixed the problem.
  //           setUrl(url)
  //           const ver = verRef.current + 1
  //           verRef.current = ver
  //           setVer(ver)
  //         },
  //       },
  //     ]
  //   );
  //
  // }, [])

  const navigateToLink = useCallback((link: string) => {
    console.log("navigating to link: " + link)
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({
        type: 'navigate-to-link',
        link
      }));
    }
  }, [])

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

  // useEffect(() => {
  //   const handleDeepLink = (event: { url: string }) => {
  //     const { url } = event;
  //     console.log("Deep link received:", url);
  //     //navigateToLink(url)
  //     //webViewRef.current.
  //     //changeURL(url)
  //   };
  //
  //   // Listen for deep link events
  //   const subscription = Linking.addEventListener("url", handleDeepLink);
  //
  //   async function doAsync() {
  //     // TODO: get the initial URL but right now we don't do anything with it. I
  //     // think this might be a queue and if we don't listen for the first one, we
  //     // won't get subsequent URLs.  However, we DO need to get the initial URL.
  //     const initialURL = await Linking.getInitialURL()
  //
  //     if (initialURL) {
  //       setUrl(initialURL)
  //     } else {
  //       changeURL(config.INITIAL_LOAD_URL)
  //     }
  //
  //   }
  //
  //   doAsync().catch(console.error)
  //
  //   return () => subscription.remove();
  // }, []);

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
                       onMessage={event => handlePushMessage(event)}
                       onShouldStartLoadWithRequest={handleNavigation}
                       webviewDebuggingEnabled={__DEV__}
                       onError={(event) => setError(event.nativeEvent.description)}
                       allowsBackForwardNavigationGestures={true}
                       javaScriptCanOpenWindowsAutomatically={true}
                       style={{ flex: 1 }} />
            )}

            {userInfo && userInfo.userId !== 0 && (
              <ExpoNotifications userId={userInfo.userId} knockJWT={userInfo.knockJWT} onLink={changeURL}/>
            )}
          </>
        )}

      </View>
    </>
  );
}

function rewriteExpoURL(url: string | null) {

  if (url === null || url === undefined) {
    return config.MAIN_APP_URL;
  }

  if (url.trim() === '') {
    return config.MAIN_APP_URL;
  }

  const initialURL = new URL(config.MAIN_APP_URL)
  const rewriteURL = new URL(url)

  return `${initialURL.origin}${rewriteURL.pathname}${rewriteURL.search}`

}

const Styles = {
  textContainer: {
    backgroundColor: 'red', color: 'white'
  }
} as const
