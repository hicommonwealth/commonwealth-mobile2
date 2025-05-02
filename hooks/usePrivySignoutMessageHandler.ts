import {usePrivy} from "@privy-io/expo";
import {useCallback} from "react";
import {WebViewMessageEvent} from "react-native-webview";

export function usePrivySignoutMessageHandler() {

  const {logout} = usePrivy()

  return useCallback((event: WebViewMessageEvent) => {

    const msg = JSON.parse(event.nativeEvent.data);

    if (msg.type === 'privy.signout') {
      logout().catch(console.error)
    }

  }, [logout])

}
