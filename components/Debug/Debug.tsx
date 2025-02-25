import React from 'react';
import { View, Button, Alert } from 'react-native';

/**
 * Basic component for debugging new functionality in react-native.
 */
export function Debug() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Press Me" onPress={() => Alert.alert('Button Pressed')} />
    </View>
  );
}
