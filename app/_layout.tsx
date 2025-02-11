import React from 'react'
import {SafeAreaProvider} from "react-native-safe-area-context";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {interceptLogging} from "@/util/interceptLogging";

interceptLogging()

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
