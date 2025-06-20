import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/hooks/rpc/useMobileRPCReceiver";
import {usePrivyAuthStatus, IPrivyAuthStatus} from "@/components/RequireAuth/PrivyAuthContext";

export function usePrivyAuthStatusListener() {

  const privyAuthStatus = usePrivyAuthStatus()

  const handler = useCallback(async (request: {}): Promise<IPrivyAuthStatus> => {
    console.log("usePrivyAuthStatusListener: Responding to webapp with: " + JSON.stringify(privyAuthStatus, null, 2))
    return privyAuthStatus
  }, [privyAuthStatus])

  return useMobileRPCReceiver<{}, IPrivyAuthStatus>('privy.authStatus', handler)

}

