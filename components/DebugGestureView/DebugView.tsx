import {ScrollView, Text, View} from "react-native";
import React, {useCallback, useState} from "react";
import Constants from 'expo-constants';
import {config, ConfigName, setConfig} from "@/util/config";
import {getLogEntries} from "@/util/interceptLogging";
import {useRemounter} from "@/components/Remounter/useRemounter";
import {Picker} from "@react-native-picker/picker";
import {AuthDebug} from "@/components/RequireAuth/AuthDebug";
import { Menu, Button } from 'react-native-paper';

type Props = {
  properties?: {[key: string]: string};
  onClose: () => void;
}

const appVersion = Constants.expoConfig?.version;

const logEntries = getLogEntries()

export function DebugView(props: Props) {

  const remounter = useRemounter()
  const [selectedView, setSelectedView] = useState<string>('properties');
  const [menuVisible, setMenuVisible] = React.useState(false);


  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const changeConfig = useCallback((conf: ConfigName) => {
    setConfig(conf)
    remounter()
  }, [remounter])

  return (
    <View style={styles.main}>
a
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{selectedView}</Button>}
      >
        <Menu.Item onPress={() => { setSelectedView('configs'); closeMenu(); }} title="configs" />
        <Menu.Item onPress={() => { setSelectedView('properties'); closeMenu(); }} title="properties" />
        <Menu.Item onPress={() => { setSelectedView('logs'); closeMenu(); }} title="logs" />
        <Menu.Item onPress={() => { setSelectedView('privy'); closeMenu(); }} title="privy" />
      </Menu>

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
              <Button onPress={() => changeConfig('frack')}>
                Use frack
              </Button>
            </View>

            <View style={styles.button}>
              <Button onPress={() => changeConfig('beta')}>
                Use beta
              </Button>
            </View>

            <View style={styles.button}>
              <Button onPress={() => changeConfig('test')}>
                Use test
              </Button>
            </View>

            <View style={styles.button}>
              <Button onPress={() => changeConfig('prod')}>
                Use common.xyz
              </Button>
            </View>

            <View style={styles.button}>
              <Button onPress={props.onClose}>
                Close
              </Button>
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
