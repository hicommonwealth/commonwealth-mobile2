import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {
  onEnter: (text: string) => void;
  onCancel: () => void;
  placeholder: string;
  inputMode: 'tel' | 'email'
  label: string
};

export function EnterDialog(props: Props) {
  const { onCancel, onEnter, label, inputMode, placeholder } = props;
  const [text, setText] = useState('');

  const handleEnter = () => {
    onEnter(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
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
