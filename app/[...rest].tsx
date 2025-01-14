import React from "react";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function Rest() {
  return (
    <SafeAreaProvider>
      <NetworkDetector/>
    </SafeAreaProvider>
  )
}
