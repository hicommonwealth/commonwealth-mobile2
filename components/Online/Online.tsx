import {ActivityIndicator, Linking, View} from "react-native";
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation
} from "react-native-webview";
import React, {useCallback, useState} from "react";
import ExpoNotifications from "@/components/ExpoNotifications/ExpoNotifications";
import {isInternalURL} from "@/util/isInternalURL";
import About from "@/components/About/About";

// TODO: I think about:blank is what's crashing us and we should probably load
// https://common.xyz/_blank
//

// const INITIAL_LOAD_URL = 'https://common.xyz/blank.html';
const INITIAL_LOAD_URL = 'https://www.example.com';

//const MAIN_APP_URL = 'http://192.168.89.37:8080'
const MAIN_APP_URL = 'https://common.xyz'


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

export default function Online() {

  const [userAgent, setUserAgent] = useState<string | undefined>(undefined);

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
  const [url, setUrl] = useState<string | undefined>(MAIN_APP_URL)

  const [view, setView] = useState<'app' | 'about'>('app');

  const handleUserAgent = useCallback((userAgent: string) => {

    // This is a workaround to avoid react-native-device-info which won't work
    // on expo because it's a non-linked native mobile. That's the standard
    // way to get the userAgent, but it won't work with expo.
    //
    // The way this works is that we first mount the webview on about:blank,
    // then we get the userAgent in the JS context of the webview via the
    // standard navigator.userAgent, Then we post that BACK to react-native,
    // which unmounts the temporary webview on about:blank then loads our REAL
    // webview.
    //
    // Without this hack, Google auth will refuse to load because it blocks
    // 'unsafe' browsers.

    setUserAgent(removeBuildString(userAgent));
  }, [])

  const handlePushMessage = useCallback((event: WebViewMessageEvent) => {

    const msg = JSON.parse(event.nativeEvent.data);

    if (msg.type === 'about') {
      setView('about')
      return;
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

  }, [])

  const handleNavigation = useCallback((event: WebViewNavigation) => {
    // Check if the URL is an external URL
    if (!isInternalURL(event.url)) {
      Linking.openURL(event.url)
        .catch(console.error)
      return false; // Prevent the WebView from loading this URL
    }
    return true; // Allow the WebView to load the URL
  }, []);

  if (view === 'about') {
    return <About onClose={() => setView('app')}
                  userId={userInfo?.userId}
                  url={url}/>
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >

      {! userAgent && (
        // It's important that width/height are set to zero here so that the
        // control doesn't temporarily flash.  DO NOT use display:none because
        // this will fail on Safari.
        <>
          <ActivityIndicator size="large" color="blue"/>
          <WebView
            source={{ uri: INITIAL_LOAD_URL }}
            style={{width: 0, height: 0}}
            onMessage={(event) => handleUserAgent(event.nativeEvent.data)}
            injectedJavaScript={`window.ReactNativeWebView.postMessage(navigator.userAgent);`}
          />
        </>
      )}

      {userAgent && (
        <>
          <WebView source={{ uri: MAIN_APP_URL }}
                   userAgent={userAgent}
                   onMessage={event => handlePushMessage(event)}
                   onShouldStartLoadWithRequest={handleNavigation}
                   style={{ flex: 1 }} />

          {userInfo && userInfo.userId !== 0 && (
            <ExpoNotifications userId={userInfo.userId} knockJWT={userInfo.knockJWT}/>
          )}

        </>
      )}

    </View>
  );
}
