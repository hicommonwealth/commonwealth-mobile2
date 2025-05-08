import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/hooks/rpc/useMobileRPCReceiver";
import {usePrivyAuthStatus} from "@/hooks/usePrivyAuthStatus";
import * as Notifications from "expo-notifications";

type PermissionStatus = {
  status: 'granted' | 'denied' | 'undetermined'
}

export function useNotificationsGetPermissionsAsyncListener() {
  const privyAuthStatus = usePrivyAuthStatus();

  const handler = useCallback(async (request: {}): Promise<PermissionStatus> => {
    const {status} = await Notifications.getPermissionsAsync()
    return {status}
  }, [privyAuthStatus])

  return useMobileRPCReceiver<{}, PermissionStatus>('Notifications.getPermissionsAsync', handler)

}

