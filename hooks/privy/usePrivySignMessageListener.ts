import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/hooks/rpc/useMobileRPCReceiver";
import {useSignMessageWithRequest} from "@/hooks/privy/useSignMessageWithRequest";

export function usePrivySignMessageListener() {

  const {signMessage} = useSignMessageWithRequest()

  const handleSignMessageWithSignMessage = useCallback(async (message: string): Promise<string> => {
    const result = await signMessage({message})

    if (typeof result === 'string') {
      // the result type of signMessage is wrong.
      return result;
    }

    return result.signature

  }, [signMessage])

  return useMobileRPCReceiver<string, string>('privy.signMessage', handleSignMessageWithSignMessage)

}
