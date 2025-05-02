import {usePrivy} from "@privy-io/expo";
import {Button, ScrollView, Text} from "react-native";
import {useSignMessage} from "@privy-io/expo/ui";
import {usePrivyAuthStatus} from "@/hooks/usePrivyAuthStatus";

export const AuthDebug = () => {
  const {user, logout} = usePrivy();
  const privyAuthStatus = usePrivyAuthStatus()
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
    <ScrollView>
      <Text>Logged in as user: {JSON.stringify(user, null, 2)}</Text>

      <Text>Privy auth status: {JSON.stringify(privyAuthStatus, null, 2)}</Text>

      <Button title="Sign Message" onPress={handleSignMessage}/>

      <Button title="Logout" onPress={handleLogout}/>
    </ScrollView>
  )

};
