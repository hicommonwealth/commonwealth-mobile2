import {usePrivy} from "@privy-io/expo";
import {View, Text, Button} from "react-native";
import {useSignMessage} from "@privy-io/expo/ui";

export const AuthDebug = () => {
  const {user, logout} = usePrivy();
  const {signMessage} = useSignMessage()

  const handleLogout = () => {
    logout().catch(console.error)
  }

  const handleSignMessage = () => {
    async function doAsync() {
      await signMessage({message: 'hello world'});

    }
    doAsync().catch(console.error);
  }

  return (
    <View>
      <Text>Logged in as user: {user?.id}</Text>

      <Button title="Sign Message" onPress={handleSignMessage}/>

      <Button title="Logout" onPress={handleLogout}/>
    </View>
  )

};
