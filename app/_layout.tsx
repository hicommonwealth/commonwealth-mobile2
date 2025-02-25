import React from 'react'
import {SafeAreaProvider} from "react-native-safe-area-context";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {interceptLogging} from "@/util/interceptLogging";
import {Remounter} from "@/components/Remounter/Remounter";
import {Debug} from "@/components/Debug/Debug";

interceptLogging()

export default function RootLayout() {
  return (
    <Debug/>
  )

  // return (
  //   <Remounter>
  //
  //     <SafeAreaProvider>
  //       <NetworkDetector/>
  //     </SafeAreaProvider>
  //
  //   </Remounter>
  // )

}
