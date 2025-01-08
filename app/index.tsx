import React from "react";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Login from "@/components/Login/Login";
import {useMagic} from "@/hooks/useMagic";

export default function Index() {
  const magic = useMagic()
  return (
    <SafeAreaProvider>
      {/*<NetworkDetector/>*/}
      <magic.Relayer/>
      <Login/>
    </SafeAreaProvider>
  )
}
