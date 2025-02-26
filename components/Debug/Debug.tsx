import React, {useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useSafeAreaInsets} from "react-native-safe-area-context";

/**
 * Basic component for debugging new functionality in react-native.
 */
export function Debug() {

  const insets = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);

  const triggerRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>
      <StatusBar backgroundColor="white" style="dark"/>
      <ScrollView style={{}}
                  contentContainerStyle={{ flex: 1 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      enabled={true}
                      onRefresh={() => {
                        triggerRefresh();
                      }}
                    />
                  }>

        <Text>This is just some text</Text>
      </ScrollView>

    </View>
  );
}
