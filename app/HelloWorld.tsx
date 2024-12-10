import {View, Text} from "react-native";
import React from "react";

export default function HelloWorld() {
  return (
    <View style={styles.centered}>
      <Text style={styles.mainText}>Hello World</Text>
    </View>
  )
}

const styles = {
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
};
