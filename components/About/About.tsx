import {Button, ScrollView, Text, View} from "react-native";
import React from "react";
import Constants from 'expo-constants';
import {config} from "@/util/config";
import KNOCK_PUBLIC_API_KEY = config.KNOCK_PUBLIC_API_KEY;
import KNOCK_EXPO_CHANNEL_ID = config.KNOCK_EXPO_CHANNEL_ID;
import {getLogEntries} from "@/util/interceptLogging";

type Props = {
  onClose: () => void;
  onURL: (url: string) => void
  userId: number | undefined;
  knockJWT: string | undefined;
  url: string | undefined;
}

const appVersion = Constants.expoConfig?.version;

const logEntries = getLogEntries()

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

      <ScrollView style={styles.logs}>
        {logEntries.map((item, index) => (
          <Text key={index}>
            {item.level} ${JSON.stringify(item.args)}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.centered}>

        <View style={styles.button}>
          <Button title="Use frack" onPress={() => props.onURL('https://commonwealth-frack.herokuapp.com')} />
        </View>

        <View style={styles.button}>
          <Button title="Use common.xyz" onPress={() => props.onURL('https://common.xyz')} />
        </View>

        <View style={styles.button}>
          <Button title="Close" onPress={props.onClose} />
        </View>
      </View>
    </View>
  )
}

const styles = {
  logs: {
    flex: 1
  },
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
