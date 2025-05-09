import {View, Button, StyleSheet} from "react-native";
import {LoginWithOAuthInput, useLoginWithOAuth} from "@privy-io/expo";
import React from "react";
import {LoginWithEmail} from "@/components/PrivyLogin/LoginWithEmail";
import {LoginWithSMS} from "@/components/PrivyLogin/LoginWithSMS";

type AuthMode = 'email' | 'sms';

export const PrivyLogin = () => {
  const {login} = useLoginWithOAuth();
  const [mode, setMode] = React.useState<AuthMode | undefined>(undefined);

  const handleOAuth = (input: LoginWithOAuthInput) => {
    login(input).catch(console.error);
  };

  if (mode === 'email') {
    return (
      <LoginWithEmail onCancel={() => setMode(undefined)} />
    );
  }

  if (mode === 'sms') {
    return (
      <LoginWithSMS onCancel={() => setMode(undefined)} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <Button onPress={() => handleOAuth({provider: 'google'})} title="Login with Google" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => handleOAuth({provider: 'apple'})} title="Login with Apple" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => handleOAuth({provider: 'discord'})} title="Login with Discord" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => setMode('email')} title="Login with Email" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => setMode('sms')} title="Login with SMS" />
        </View>
        {/*<View style={styles.button}>
          <Button onPress={() => login({provider: 'apple'})} title="Login with Apple" />
        </View>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  button: {
    width: '100%',
  },
});
