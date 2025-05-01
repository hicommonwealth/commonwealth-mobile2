import {useLoginWithEmail} from '@privy-io/expo';
import React, {useState} from "react";
import {Button, TextInput, View, Text} from "react-native";

export function LoginWithEmail() {
  const [email, setEmail] = useState('');
  const {sendCode, loginWithCode} = useLoginWithEmail();
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");

  const handleSendCode = () => {

    async function doAsync() {
      await sendCode({email});
      setCodeSent(true);
    }

    doAsync().catch(console.error);

  }

  return (
    <View>
      <Text>Login</Text>

      {! codeSent && (
        <>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            inputMode="email"
          />
          <Button
            onPress={handleSendCode}
            title="Send Code"
            />
        </>
      )}

      {codeSent && (
        <>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Code"
            inputMode="text"
          />

          <Button onPress={() => loginWithCode({code: code, email})}
                  title='Login'/>
        </>
      )}
    </View>
  );
}
