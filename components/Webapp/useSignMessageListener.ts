import {useSignMessage} from "@privy-io/expo/ui";
import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/components/Webapp/useMobileRPCReceiver";

export function useSignMessageListener() {

  const {signMessage} = useSignMessage()

  const handleSignMessage = useCallback(async (message: string): Promise<string> => {
    const result = await signMessage({message})

    if (typeof result === 'string') {
      // the result type of signMessage is wrong.
      return result;
    }

    return result.signature

  }, [signMessage])

  return useMobileRPCReceiver<string, string>('privy.signMessage', handleSignMessage)

}
