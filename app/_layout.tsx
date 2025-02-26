import React from 'react'
import {SafeAreaProvider} from "react-native-safe-area-context";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {interceptLogging} from "@/util/interceptLogging";
import {Remounter} from "@/components/Remounter/Remounter";

interceptLogging()

export default function RootLayout() {

  return (
    <Remounter>

      <SafeAreaProvider>
        <NetworkDetector/>
      </SafeAreaProvider>

    </Remounter>
  )

}
