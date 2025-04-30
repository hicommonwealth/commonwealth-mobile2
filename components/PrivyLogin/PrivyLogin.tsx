import {View, Button} from "react-native";
import {useLoginWithOAuth} from "@privy-io/expo";

export const PrivyLogin = () => {
  const {login} = useLoginWithOAuth();

  // FIXME try to unmount and then show JUST PrivyElements...

  const handleGoogle = () => {
    console.log("handleGoogle")
    login({provider: 'google'})
      .catch(console.error)
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleGoogle} title='Login with Google'/>
      <Button onPress={() => login({provider: 'apple'})} title='Login with Apple'/>
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
