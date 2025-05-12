import {View, Button, StyleSheet, Image} from "react-native";
import {LoginWithOAuthInput, useLoginWithOAuth} from "@privy-io/expo";
import React from "react";
import {LoginWithEmail} from "@/components/PrivyLogin/LoginWithEmail";
import {LoginWithSMS} from "@/components/PrivyLogin/LoginWithSMS";

const Logo = require('../../assets/images/adaptive-icon.png')

type AuthMode = 'email' | 'sms';

export const PrivyLogin = () => {
  const {login} = useLoginWithOAuth();
  const [mode, setMode] = React.useState<AuthMode | undefined>(undefined);

  const handleOAuth = (input: LoginWithOAuthInput) => {
    async function doAsync() {
      const user = await login(input)
    }

    doAsync().catch(console.error);
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

        <Image source={Logo} style={styles.logo} />

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

        <View style={{height: 200}}>

        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  section: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
  },
  buttonGroup: {
    gap: 16,
    padding: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
  },
});
