import { useNotificationsGetPermissionsAsyncListener } from "./useNotificationsGetPermissionsAsyncListener";
import {useCallback} from "react";
import {WebViewMessageEvent} from "react-native-webview";
import {
  useNotificationsRequestPermissionsAsyncListener
} from "@/hooks/notifications/useNotificationsRequestPermissionsAsyncListener";

export function useNotificationsListener() {

  const notificationsGetPermissionsAsyncListener = useNotificationsGetPermissionsAsyncListener()
  const notificationsRequestPermissionsAsyncListener = useNotificationsRequestPermissionsAsyncListener();

  return useCallback((event: WebViewMessageEvent, postMessage: (msg: string) => void) => {
    notificationsGetPermissionsAsyncListener(event, postMessage)
    notificationsRequestPermissionsAsyncListener(event, postMessage)
  }, [notificationsGetPermissionsAsyncListener, notificationsRequestPermissionsAsyncListener]);

}
