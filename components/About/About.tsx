import {Button, Text, View} from "react-native";
import React from "react";

type Props = {
  onClose: () => void;
}

export default function About(props: Props) {
  return (
    <View style={styles.centered}>
      <Text style={styles.offlineText}>Common Mobile App</Text>
      <Text style={styles.instructions}></Text>

      <Button title="Close" onPress={props.onClose} />
    </View>
  )
}

const styles = {
  centered: {
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
