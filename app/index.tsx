import React from "react";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useMagic} from "@/hooks/useMagic";

export default function Index() {
  const magic = useMagic()
  return (
    <SafeAreaProvider>
      <magic.Relayer/>
      <NetworkDetector/>
    </SafeAreaProvider>
  )
}
