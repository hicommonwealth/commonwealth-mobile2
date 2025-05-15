import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/hooks/rpc/useMobileRPCReceiver";
import {usePrivy} from "@privy-io/expo";
import {Alert} from "react-native";

type Input = {
  error?: string
}

export function usePrivyLogoutListener() {

  const {logout} = usePrivy()

  const handler = useCallback(async (input: Input): Promise<{}> => {
    await logout()
    if (input.error) {
      Alert.alert('Error', input.error);
    }
    return {}

  }, [logout])

  return useMobileRPCReceiver<Input, {}>('privy.logout', handler)

}
