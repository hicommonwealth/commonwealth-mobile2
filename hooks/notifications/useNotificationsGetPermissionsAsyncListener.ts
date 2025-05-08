import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/hooks/rpc/useMobileRPCReceiver";
import * as Notifications from "expo-notifications";

type PermissionStatus = {
  status: 'granted' | 'denied' | 'undetermined'
}

export function useNotificationsGetPermissionsAsyncListener() {

  const handler = useCallback(async (request: {}): Promise<PermissionStatus> => {
    const {status} = await Notifications.getPermissionsAsync()
    return {status}
  }, [])

  return useMobileRPCReceiver<{}, PermissionStatus>('Notifications.getPermissionsAsync', handler)

}

