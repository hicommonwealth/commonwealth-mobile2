import {Button, Text, View} from "react-native";
import React from "react";

type Props = {
  onClose: () => void;
  userId: number | undefined;
  url: string | undefined;
  userAgent: string | undefined
  userAgentRaw: string | undefined
}

export default function About(props: Props) {
  return (
    <View style={styles.centered}>
      <Text style={styles.offlineText}>Common Mobile App</Text>
      <Text style={styles.info}>
        Your userId is: {props.userId}
      </Text>

      <Text style={styles.info}>
        Loading URL: {props.url}
      </Text>

      <Text style={styles.info}>
        User agent: {props.userAgent}
      </Text>

      <Text style={styles.info}>
        User agent raw: {props.userAgentRaw}
      </Text>

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
  info: {
    fontSize: 16,
    textAlign: 'center',
  },
} as const;
