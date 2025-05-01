import {useLoginWithEmail, useLoginWithSMS} from '@privy-io/expo';
import React, {useState} from "react";
import {Button, TextInput, View, Text} from "react-native";
import {CodeDialog} from "@/components/PrivyLogin/CodeDialog";
import {EnterEmail} from "@/components/PrivyLogin/EnterEmail";
import { EnterPhone } from './EnterPhone';

type Props = {
  onCancel: () => void;
}

export function LoginWithSMS(props: Props) {
  const {onCancel} = props;
  const [phone, setPhone] = useState('');
  const {sendCode, loginWithCode} = useLoginWithSMS();
  const [codeSent, setCodeSent] = useState(false);

  const handleCode = (code: string) => {
    async function doAsync() {
      await loginWithCode({code, phone})
    }
    doAsync().catch(console.error);
  }

  const handleSendCode = (phone: string) => {
    setPhone(phone);
    async function doAsync() {
      await sendCode({phone});
      setCodeSent(true);
    }

    doAsync().catch(console.error);

  }

  return (
    <View style={{flex: 1}}>

      {! codeSent && (
        <EnterPhone onPhone={handleSendCode} onCancel={onCancel}/>
      )}

      {codeSent && (
        <>

          <CodeDialog onComplete={handleCode}
                      headerText={'Enter the code we sent to your phone'}
                      onCancel={onCancel} />
        </>
      )}
    </View>
  );
}
