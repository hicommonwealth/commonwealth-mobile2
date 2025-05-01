import {View, Button} from "react-native";
import {useLoginWithOAuth} from "@privy-io/expo";
import {PrivyElements} from "@privy-io/expo/ui";
import React from "react";
import {LoginWithEmail} from "@/components/PrivyLogin/LoginWithEmail";

export const PrivyLogin = () => {
  const {login} = useLoginWithOAuth();

  const [mode, setMode] = React.useState<string>('email')

  // FIXME try to unmount and then show JUST PrivyElements...

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
      <LoginWithEmail/>
    )
  }

  return (
    <View style={styles.container}>

      <Button onPress={handleGoogle} title='Login with Google'/>
      <Button onPress={() => setMode('email')} title='Login with Eail'/>
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
