import {useSignMessage} from "@privy-io/expo/ui";
import {useCallback} from "react";
import {WebViewMessageEvent} from "react-native-webview";

export function useSignMessageListener() {

  const {signMessage} = useSignMessage()

  return useCallback((event: WebViewMessageEvent, postMessage: (msg: string) => void) => {
    const msg = JSON.parse(event.nativeEvent.data);

    if (msg.type === 'privy.sign_message') {
      const message: string = msg.data.message

      const __requestID = msg.__requestID

      console.log("FIXME: ", msg)
      console.log("FIXME: __requestID: ", __requestID)

      async function doAsync() {
        // send the response back...
        const result = await signMessage({message})
        console.log("FIXME sending result back: result: ", result)

        console.log("FIXME: 2345" + typeof result)
        postMessage(JSON.stringify({
          data: {
            signature: result,
            // FIXME which __requestID
            __requestID
          },
          __requestID
        }))
      }

      doAsync().catch(console.error)

    }
  }, [signMessage])

}
