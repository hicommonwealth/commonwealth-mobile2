import React, {memo} from "react";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default memo(function Index() {
  return (
    <SafeAreaProvider>
      <NetworkDetector/>
    </SafeAreaProvider>
  )
})
