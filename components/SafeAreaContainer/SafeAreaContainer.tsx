import {View} from "react-native";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";

type Props = {
  children: React.ReactNode
  darkMode: boolean | undefined;
}

export default function SafeAreaContainer(props: Props) {
  const {darkMode} = props;
  const insets = useSafeAreaInsets();

  // TODO: we might also want to look at useColorSchema to get the default mode
  // for the OS but realistically, our dark mode is not that functional, yet.
  const mode = darkMode ? styles.darkMode : styles.lightMode;

  // The standard SafeAreaView doesn't work properly on iPad and reserves like
  // a half inch at the bottom so we're only using the paddingTop now to
  // reserve space near the top.

  return (
    <View style={{...styles.container, ...mode, paddingTop: insets.top}}>
      <StatusBar/>
      {props.children}
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
  },
  darkMode: {
    backgroundColor: '#000',
    color: '#fff',
  },
  lightMode: {
    backgroundColor: '#fff',
    color: '#000',
  }
}

