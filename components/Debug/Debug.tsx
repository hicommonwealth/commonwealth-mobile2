import React, {useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';

/**
 * Basic component for debugging new functionality in react-native.
 */
export function Debug() {

  const [refreshing, setRefreshing] = useState(false);

  const triggerRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
