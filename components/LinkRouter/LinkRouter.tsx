import React, { useEffect } from "react";
import {Alert, Linking} from "react-native";

export const LinkRouter = () => {

  // TODO: I don't think this is actually needed because we can handle linking
  // directly inside the Webview
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { url } = event;
      console.log("Redirect URL received:", url);

      Alert.alert(
        "Got Linking URL",
        "URL here: " + url,
        [
          { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );

    };

    // Listen for deep link events
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Handle initial URL if app is opened via link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, []);

  return null;

}
