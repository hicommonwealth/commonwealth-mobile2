import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/hooks/rpc/useMobileRPCReceiver";
import * as Notifications from "expo-notifications";

type PermissionStatus = {
  status: 'granted' | 'denied' | 'undetermined'
}

export function useNotificationsRequestPermissionsAsyncListener() {

  const handler = useCallback(async (request: {}): Promise<PermissionStatus> => {
    const {status} = await Notifications.requestPermissionsAsync()
    return {status}
  }, [])

  return useMobileRPCReceiver<{}, {}>('Notifications.requestPermissionsAsync', handler)

}

