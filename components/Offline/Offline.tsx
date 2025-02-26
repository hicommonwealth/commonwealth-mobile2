import {View, Text} from "react-native";
import React from "react";
import SafeAreaContainer from "@/components/SafeAreaContainer/SafeAreaContainer";

export default function Offline() {
  return (
    <SafeAreaContainer darkMode={false}>
      <View style={styles.centered}>
        <Text style={styles.offlineText}>You are offline!</Text>
        <Text style={styles.instructions}>Please check your internet connection.</Text>
      </View>
    </SafeAreaContainer>
  )
}

const styles = {
  centered: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
  },
} as const;
