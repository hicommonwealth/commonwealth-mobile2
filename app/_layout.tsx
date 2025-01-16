import React from 'react'
import {Slot} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";

export default function RootLayout() {
  return (
    <>
      {/*<Slot />*/}
      {/*<StatusBar style="auto" />*/}

      <SafeAreaProvider>
        <NetworkDetector/>
      </SafeAreaProvider>

    </>
  )

}
