import {Linking, View} from "react-native";
import WebView, {WebViewNavigation} from "react-native-webview";
import {useCallback, useState} from "react";

// TODO: I think about:blank is what's crashing us.
const INITIAL_LOAD_URL = 'https://www.example.com';

const APP_URL = 'https://commonwealth.im'

function removeBuildString(input: string): string {
  // remove the react-native-webview build string from the UA.
  const pattern = / Build\/UP1A\.[0-9]+\.[0-9]+; wv/;
  return input.replace(pattern, '');
}

export default function Online() {

  const [userAgent, setUserAgent] = useState<string | undefined>(undefined);

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

  const handleNavigation = useCallback((event: WebViewNavigation) => {
    // Check if the URL is an external URL
    if (!event.url.startsWith(APP_URL)) {
      Linking.openURL(event.url); // Open the external URL in the device's main browser
      return false; // Prevent the WebView from loading this URL
    }
    return true; // Allow the WebView to load the URL
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}
    >

      {! userAgent && (
        <WebView
          source={{ uri: INITIAL_LOAD_URL }}
          onMessage={(event) => handleUserAgent(event.nativeEvent.data)}
          injectedJavaScript={`window.ReactNativeWebView.postMessage(navigator.userAgent);`}
        />
      )}

      {userAgent && (
        <WebView source={{ uri: APP_URL }}
                 userAgent={userAgent}
                 onShouldStartLoadWithRequest={handleNavigation}
                 style={{ flex: 1 }} />
      )}

    </View>
  );
}
