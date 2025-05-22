import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
const Logo = require('../../assets/images/adaptive-icon.png')

type Props = {
  onEnter: (text: string) => void;
  onCancel: () => void;
  headerText: string;
  placeholder: string;
  inputMode: 'tel' | 'email'
  label: string
};

export function EnterDialog(props: Props) {
  const { onCancel, onEnter, label, inputMode, placeholder, headerText } = props;
  const [text, setText] = useState('');

  const handleEnter = () => {
    onEnter(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>

        <View style={styles.logoBox}>
          <Image source={Logo} style={styles.logo} />
        </View>

        <Text style={styles.title}>
          {headerText}
        </Text>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          inputMode={inputMode}
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <Button onPress={onCancel} title="Cancel" color="#888" />
          </View>
          <View style={styles.button}>
            <Button onPress={handleEnter} title={label} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff'
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    marginBottom: 8,
    fontSize: 32,
    textAlign: 'center',
  },
  logoBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    width: '100%',
    maxWidth: 400,
  },
  header: {
    fontSize: 24,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
