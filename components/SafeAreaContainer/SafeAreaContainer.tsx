import {useColorScheme, View} from "react-native";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";

type Props = {
  children: React.ReactNode
}

export default function SafeAreaContainer(props: Props) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  // this doesn't work on Android for some reason.
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';

  // The standard SafeAreaView doesn't work properly on iPad and reserves like
  // a half inch at the bottom so we're only using the paddingTop now to
  // reserve space near the top.

  return (
    <View style={{...styles.container, paddingTop: insets.top, backgroundColor }}>
      <StatusBar/>
      {props.children}
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
  }
}

