import React from "react";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {LinkRouter} from "@/components/LinkRouter/LinkRouter";

export default function Index() {
  return (
    <SafeAreaProvider>
      <LinkRouter/>
      <NetworkDetector/>
    </SafeAreaProvider>
  )
}
