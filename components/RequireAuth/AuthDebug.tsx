import {useOAuthTokens, usePrivy} from "@privy-io/expo";
import {Button, ScrollView, Text} from "react-native";
import {usePrivyAuthStatus} from "@/hooks/privy/usePrivyAuthStatus";
import {useSignMessageWithRequest} from "@/hooks/privy/useSignMessageWithRequest";

export const AuthDebug = () => {
  const {user, logout} = usePrivy();
  const privyAuthStatus = usePrivyAuthStatus()
  const {signMessage} = useSignMessageWithRequest()

  // FIXME: this DOES work but I need to figure out a way to store this until the auth flow is ready...
  //useOAuthTokens();

  console.log("user: ", JSON.stringify(user, null, 2))

  const handleLogout = () => {
    logout().catch(console.error)
  }

  const handleSignMessage = () => {
    async function doAsync() {
      console.log("Going to sign message...")
      const {signature} = await signMessage({message: 'hello world'});
      console.log("Got signature: " + signature)
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
