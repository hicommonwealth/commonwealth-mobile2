import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/hooks/rpc/useMobileRPCReceiver";
import * as Notifications from "expo-notifications";

export function useNotificationsRequestPermissionsAsyncListener() {

  const handler = useCallback(async (request: {}): Promise<{}> => {
    await Notifications.requestPermissionsAsync()
    return {}
  }, [])

  return useMobileRPCReceiver<{}, {}>('Notifications.requestPermissionsAsync', handler)

}

