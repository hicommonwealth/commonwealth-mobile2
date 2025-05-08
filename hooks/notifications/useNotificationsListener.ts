import { useNotificationsGetPermissionsAsyncListener } from "./useNotificationsGetPermissionsAsyncListener";
import {useCallback} from "react";
import {WebViewMessageEvent} from "react-native-webview";

export function useNotificationsListener() {

  const notificationsGetPermissionsAsyncListener = useNotificationsGetPermissionsAsyncListener()

  return useCallback((event: WebViewMessageEvent, postMessage: (msg: string) => void) => {
    notificationsGetPermissionsAsyncListener(event, postMessage)
  }, [notificationsGetPermissionsAsyncListener]);

}
