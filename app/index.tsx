import React from "react";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function Index() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NetworkDetector/>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
