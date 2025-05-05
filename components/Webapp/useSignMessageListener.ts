import {useSignMessage} from "@privy-io/expo/ui";
import {useCallback} from "react";
import {WebViewMessageEvent} from "react-native-webview";

export function useSignMessageListener() {

  const {signMessage} = useSignMessage()

  return useCallback((event: WebViewMessageEvent) => {
    const msg = JSON.parse(event.nativeEvent.data);

    if (msg.type === 'privy.sign_message') {
      const message: string = msg.data.message

      const __requestID = msg.__requestID

      async function doAsync() {
        // send the response back...
        await signMessage({message})

      }

      doAsync().catch(console.error)

    }
  }, [signMessage])

}
