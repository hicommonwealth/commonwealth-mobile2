import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/hooks/rpc/useMobileRPCReceiver";
import {usePrivy} from "@privy-io/expo";

export function usePrivyLogoutListener() {

  const {logout} = usePrivy()

  const handler = useCallback(async (): Promise<{}> => {
    await logout()
    return {}

  }, [logout])

  return useMobileRPCReceiver<{}, {}>('privy.logout', handler)

}
