import {Button, Text, View} from "react-native";
import React from "react";
import Constants from 'expo-constants';
import { KNOCK_PUBLIC_API_KEY, KNOCK_EXPO_CHANNEL_ID } from '@env';

type Props = {
  onClose: () => void;
  userId: number | undefined;
  knockJWT: string | undefined;
  url: string | undefined;
  userAgent: string | undefined
  userAgentRaw: string | undefined
}

const appVersion = Constants.expoConfig?.version;

export default function About(props: Props) {
  return (
    <View style={styles.main}>

      <View style={styles.centered}>
        <Text style={styles.offlineText}>Common Mobile App</Text>
      </View>

      <Text style={styles.info}>
        App version: {appVersion}
      </Text>

      <Text style={styles.info}>
        KNOCK_PUBLIC_API_KEY: {KNOCK_PUBLIC_API_KEY}
      </Text>

      <Text style={styles.info}>
        KNOCK_EXPO_CHANNEL_ID: {KNOCK_EXPO_CHANNEL_ID}
      </Text>

      <Text style={styles.info}>
        Your userId is: {(props.userId === 0 || undefined) ? 'none' : props.userId}
      </Text>

      <Text style={styles.info}>
        Has knockJWT: {props.knockJWT !== undefined ? 'yes' : 'no'}
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

      <View style={styles.centered}>
         <View style={styles.button}>
          <Button title="Close" onPress={props.onClose} />
        </View>
      </View>
    </View>
  )
}

const styles = {
   main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  centered: {
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
  },
  button: {
     padding: 8
  }
} as const;
