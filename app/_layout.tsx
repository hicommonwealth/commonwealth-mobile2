import React from 'react'
import {SafeAreaProvider} from "react-native-safe-area-context";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {interceptLogging} from "@/util/interceptLogging";
import {Remounter} from "@/components/Remounter/Remounter";
import { PaperProvider } from 'react-native-paper';

interceptLogging()

export default function RootLayout() {

  return (
    <Remounter>
      <SafeAreaProvider>
        <PaperProvider>
          <NetworkDetector/>
        </PaperProvider>
      </SafeAreaProvider>
    </Remounter>
  )

}
