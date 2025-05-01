import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {
  onEmail: (email: string) => void;
  onCancel: () => void;
};

export function EnterEmail(props: Props) {
  const { onCancel, onEmail } = props;
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    onEmail(email)
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          inputMode="email"
          style={styles.input}
        />
        <Button onPress={handleSendCode} title="Send Code" />
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
});
