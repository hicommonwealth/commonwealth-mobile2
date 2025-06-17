import {View, StyleSheet, Image, TouchableOpacity, Text, Linking} from "react-native";
import {LoginWithOAuthInput, useLoginWithOAuth} from "@privy-io/expo";
import React from "react";
import {LoginWithEmail} from "@/components/PrivyLogin/LoginWithEmail";
import {LoginWithSMS} from "@/components/PrivyLogin/LoginWithSMS";
import { Button } from "react-native-paper";
import GoogleIcon from "@/components/icons/GoogleIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import SMSIcon from "@/components/icons/SMSIcon";

const Logo = require('../../assets/images/adaptive-icon.png')

type AuthMode = 'email' | 'sms';

export const PrivyLogin = () => {
  const {login} = useLoginWithOAuth();
  const [mode, setMode] = React.useState<AuthMode | undefined>(undefined);

  const handleOAuth = (input: LoginWithOAuthInput) => {
    console.log("Handling login for: " + input.provider)
    async function doAsync() {
      const user = await login(input)
    }

    doAsync().catch(console.error);
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://common.xyz/privacy')
      .catch(console.error)
  }

  const handleTOS = () => {
    Linking.openURL('https://common.xyz/terms')
      .catch(console.error)
  }

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

      <View style={styles.inner}>
      <View style={styles.buttonGroup}>

        <Image source={Logo} style={styles.logo} />

        <Text style={styles.banner}>Sign into Common</Text>
        <LoginButton onClick={() => handleOAuth({provider: 'google'})}
                     icon={() => <GoogleIcon width={48} height={48}/>}
                     text="LOGIN WITH GOOGLE"/>

        <LoginButton onClick={() => handleOAuth({provider: 'apple'})}
                     icon={() => <GoogleIcon width={48} height={48}/>}
                     text="LOGIN WITH APPLE"/>

        <LoginButton onClick={() => handleOAuth({provider: 'github'})}
                     icon={() => <GoogleIcon width={48} height={48}/>}
                     text="LOGIN WITH GITHUB"/>

        <LoginButton onClick={() => handleOAuth({provider: 'discord'})}
                     icon={() => <GoogleIcon width={48} height={48}/>}
                     text="LOGIN WITH DISCORD"/>

        <LoginButton onClick={() => handleOAuth({provider: 'twitter'})}
                     icon={() => <GoogleIcon width={48} height={48}/>}
                     text="LOGIN WITH X"/>

        <LoginButton onClick={() => setMode('email')}
                     icon={() => <EmailIcon width={48} height={48} fill={'#1b1a1c'} />}
                     text="LOGIN WITH EMAIL"/>
        <LoginButton onClick={() => setMode('sms')}
                     icon={() => <SMSIcon width={48} height={48} fill={'#1b1a1c'} />}
                     text="LOGIN WITH SMS"/>

        <View style={styles.termsSection}>
          <Text style={styles.terms}>
            By connecting to Common you agree to our <Text style={styles.link} onPress={handleTOS}>Terms of Service</Text> and <Text style={styles.link} onPress={handlePrivacyPolicy}>Privacy Policy</Text>.
          </Text>
        </View>

      </View>
      </View>
    </View>
  );
};

type LoginButtonProps = {
  onClick: () => void;
  text: string;
  icon?: () => JSX.Element
}

const LoginButton = (props: LoginButtonProps) => {
  const {icon} = props
  return (
    <Button onPress={props.onClick}
            style={{
              borderRadius: 6,
              width: '100%',
            }}
            icon={icon}
            mode='outlined'
            contentStyle={{
              flexDirection: 'row',
              justifyContent: 'center', // center text+icon
              alignItems: 'center',
            }}
            labelStyle={{
              color: '#1b1a1c',
              textAlign: 'center',
              flex: 1,
              paddingRight: 48
            }}>

      {props.text}
    </Button>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  inner: {
    flex: 1,
    maxWidth: 500,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  banner: {
    fontSize: 30,
    fontWeight: 400,
    paddingBottom: 10
  },
  logo: {
    width: 75,
    height: 75,
  },
  buttonGroup: {
    gap: 12,
    padding: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: '#2972cc'
  },
  termsSection: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  terms: {
    textAlign: 'center',
    fontSize: 16
  }
});
