import {Button, Text, View} from "react-native";
import React from "react";
import Constants from 'expo-constants';

type Props = {
  onClose: () => void;
  userId: number | undefined;
  url: string | undefined;
  userAgent: string | undefined
  userAgentRaw: string | undefined
}

const appVersion = Constants.expoConfig?.version;

export default function About(props: Props) {
  return (
    <View style={styles.centered}>
      <Text style={styles.offlineText}>Common Mobile App</Text>

      <Text style={styles.info}>
        App version: {appVersion}
      </Text>

      <Text style={styles.info}>
        Your userId is: {(props.userId === 0 || undefined) ? 'none' : props.userId}
      </Text>

      <Text style={styles.info}>
        App URL: {props.url}
      </Text>

      <Text style={styles.info}>
        User agent: {props.userAgent ?? 'none'}
      </Text>

      <Text style={styles.info}>
        User agent raw: {props.userAgentRaw ?? 'none'}
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
    backgroundColor: 'white'
  },
  offlineText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
  },
} as const;
