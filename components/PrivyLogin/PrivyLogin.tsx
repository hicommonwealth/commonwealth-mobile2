import {View, Button} from "react-native";
import {useLoginWithOAuth} from "@privy-io/expo";
import React from "react";
import {LoginWithEmail} from "@/components/PrivyLogin/LoginWithEmail";

type AuthMode = 'email'

export const PrivyLogin = () => {
  const {login} = useLoginWithOAuth();

  const [mode, setMode] = React.useState<AuthMode | undefined>(undefined)

  const handleEmail = () => {
    setMode('email')
  }

  const handleGoogle = () => {
    console.log("handleGoogle")
    login({provider: 'google'})
      .catch(console.error)
  }

  if (mode === 'email') {
    return (
      <LoginWithEmail onCancel={() => setMode(undefined)}/>
    )
  }

  return (
    <View style={styles.container}>

      <Button onPress={handleGoogle} title='Login with Google'/>
      <Button onPress={handleEmail} title='Login with Email'/>
      {/*<Button onPress={() => login({provider: 'apple'})} title='Login with Apple'/>*/}
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} as const
