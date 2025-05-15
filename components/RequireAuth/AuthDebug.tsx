import {usePrivy} from "@privy-io/expo";
import {Button, ScrollView, Text} from "react-native";
import {useSignMessageWithRequest} from "@/hooks/privy/useSignMessageWithRequest";
import {usePrivyAuthStatus} from "@/components/RequireAuth/PrivyAuthContext";
import React from "react";

export const AuthDebug = () => {
  const {user, logout} = usePrivy();
  const privyAuthStatus = usePrivyAuthStatus()
  const {signMessage} = useSignMessageWithRequest()

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

      {user && (
        <>
          <Button title="Sign Message" onPress={handleSignMessage}/>

          <Button title="Logout" onPress={handleLogout}/>
        </>
      )}

    </ScrollView>
  )

};
