import {useLoginWithEmail} from '@privy-io/expo';
import React, {useState} from "react";
import {Button, TextInput, View, Text} from "react-native";
import {CodeDialog} from "@/components/PrivyLogin/CodeDialog";

type Props = {
  onCancel: () => void;
}

export function LoginWithEmail(props: Props) {
  const {onCancel} = props;
  const [email, setEmail] = useState('');
  const {sendCode, loginWithCode} = useLoginWithEmail();
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");

  const handleCode = (code: string) => {
    async function doAsync() {
      await loginWithCode({code: code, email})
    }
    doAsync().catch(console.error);
  }

  const handleSendCode = () => {

    async function doAsync() {
      await sendCode({email});
      setCodeSent(true);
    }

    doAsync().catch(console.error);

  }

  return (
    <View style={{flex: 1}}>

      {! codeSent && (
        <>
          <Text>Login</Text>
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

          <CodeDialog onComplete={handleCode}
                      headerText={'Enter the code we sent to your email'}
                      onCancel={onCancel} />
        </>
      )}
    </View>
  );
}
