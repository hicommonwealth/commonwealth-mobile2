import React from "react";
import NetworkDetector from "@/app/NetworkDetector";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <NetworkDetector/>
    </SafeAreaProvider>
  )
}
