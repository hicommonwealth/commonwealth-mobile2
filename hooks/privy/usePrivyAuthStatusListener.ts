import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/hooks/rpc/useMobileRPCReceiver";
import {IPrivyAuthStatus, usePrivyAuthStatus} from "@/hooks/privy/usePrivyAuthStatus";

export function usePrivyAuthStatusListener() {
  const privyAuthStatus = usePrivyAuthStatus();
  const handler = useCallback(async (request: {}): Promise<IPrivyAuthStatus> => {
    return await privyAuthStatus()
  }, [privyAuthStatus])

  return useMobileRPCReceiver<{}, IPrivyAuthStatus>('privy.authStatus', handler)

}

