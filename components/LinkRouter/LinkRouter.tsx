import React, { useEffect } from "react";
import { Linking } from "react-native";

export const LinkRouter = () => {

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { url } = event;
      console.log("Redirect URL received:", url);

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
