import {useLoginWithEmail} from '@privy-io/expo';
import React, {useState} from "react";
import {Button, TextInput, View, Text} from "react-native";
import {CodeDialog} from "@/components/PrivyLogin/CodeDialog";
import {EnterEmail} from "@/components/PrivyLogin/EnterEmail";

type Props = {
  onCancel: () => void;
}

export function LoginWithEmail(props: Props) {
  const {onCancel} = props;
  const [email, setEmail] = useState('');
  const {sendCode, loginWithCode} = useLoginWithEmail();
  const [codeSent, setCodeSent] = useState(false);

  const handleCode = (code: string) => {
    async function doAsync() {
      await loginWithCode({code: code, email})
    }
    doAsync().catch(console.error);
  }

  const handleSendCode = (email: string) => {
    setEmail(email);
    async function doAsync() {
      await sendCode({email});
      setCodeSent(true);
    }

    doAsync().catch(console.error);

  }

  return (
    <View style={{flex: 1}}>

      {! codeSent && (
        <EnterEmail onEmail={handleSendCode} onCancel={onCancel}/>
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
