import React from "react";
import NetworkDetector from "@/components/NetworkDetector/NetworkDetector";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Login from "@/components/Login/Login";

export default function Index() {
  return (
    <SafeAreaProvider>
      {/*<NetworkDetector/>*/}
      <Login/>
    </SafeAreaProvider>
  )
}
