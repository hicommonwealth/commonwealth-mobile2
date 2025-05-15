import {Button, ScrollView, Text, View} from "react-native";
import React, {useCallback, useState} from "react";
import Constants from 'expo-constants';
import {config, ConfigName, setConfig} from "@/util/config";
import {getLogEntries} from "@/util/interceptLogging";
import {useRemounter} from "@/components/Remounter/useRemounter";
import {Picker} from "@react-native-picker/picker";
import {AuthDebug} from "@/components/RequireAuth/AuthDebug";

type Props = {
  properties?: {[key: string]: string};
  onClose: () => void;
}

const appVersion = Constants.expoConfig?.version;

const logEntries = getLogEntries()

export function DebugView(props: Props) {

  const remounter = useRemounter()
  const [selectedView, setSelectedView] = useState<string>('properties');

  const changeConfig = useCallback((conf: ConfigName) => {
    setConfig(conf)
    remounter()
  }, [remounter])

  return (
    <View style={styles.main}>

      <Picker
        selectedValue={selectedView}
        onValueChange={(itemValue) => setSelectedView(itemValue)}>
        <Picker.Item label="Configs" value="configs" />
        <Picker.Item label="Properties" value="properties" />
        <Picker.Item label="Logs" value="logs" />
        <Picker.Item label="Privy" value="privy" />
      </Picker>

      {selectedView === 'properties' && (
        <>
          <Text style={styles.info}>
            App version: {appVersion}
          </Text>

          <Text style={styles.info}>
            config name: {config.name}
          </Text>

          <Text style={styles.info}>
            KNOCK_PUBLIC_API_KEY: {config.KNOCK_PUBLIC_API_KEY}
          </Text>

          <Text style={styles.info}>
            KNOCK_EXPO_CHANNEL_ID: {config.KNOCK_EXPO_CHANNEL_ID}
          </Text>
        </>
      )}

      {selectedView === 'privy' && (
        <ScrollView>
          <AuthDebug/>
        </ScrollView>
      )}

      {selectedView === 'logs' && (
        <ScrollView style={styles.logs}>
          {logEntries.map((item, index) => (
            <Text key={index}>
              {item.level} ${JSON.stringify(item.args)}
            </Text>
          ))}
        </ScrollView>
      )}

      {selectedView === 'configs' && (
        <>
          <View style={styles.centered}>

            <View style={styles.button}>
              <Button title="Use frack" onPress={() => changeConfig('frack')} />
            </View>

            <View style={styles.button}>
              <Button title="Use beta" onPress={() => changeConfig('beta')} />
            </View>

            <View style={styles.button}>
              <Button title="Use test" onPress={() => changeConfig('test')} />
            </View>

            <View style={styles.button}>
              <Button title="Use common.xyz" onPress={() => changeConfig('prod')} />
            </View>

            <View style={styles.button}>
              <Button title="Close" onPress={props.onClose} />
            </View>
          </View>
        </>
      )}
    </View>
  )
}

const styles = {
  logs: {
    flex: 1
  },
  main: {
    flex: 1,
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
