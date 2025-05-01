import {usePrivy} from "@privy-io/expo";
import {View, Text, Button} from "react-native";

export const AuthDebug = () => {
  const {user, logout} = usePrivy();

  const handleLogout = () => {
    logout().catch(console.error)
  }

  return (
    <View>
      <Text>Logged in as user: {user?.id}</Text>

      <Button title="Logout" onPress={handleLogout}/>
    </View>
  )

};
