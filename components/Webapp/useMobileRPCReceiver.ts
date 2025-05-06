import {useCallback} from "react";
import {WebViewMessageEvent} from "react-native-webview";

type ProtoError = {
  message: string;
};

type ProtoRequestObject<Request> = {
  $id: string;
  type: string;
  variant: 'request';
  data: Request;
};

/**
 * Wraps a response so that it includes the error OR data.
 */
type ProtoResponseObject<Response> = {
  $id: string;
  type: string;
  variant: 'response';
  data: Response | null;
  error: ProtoError | null;
};

export function useMobileRPCReceiver<Request, Response>(type: string,
                                                        handler: (request: Request) => Promise<Response>) {

  const invoker = useCallback(async (protoRequest: ProtoRequestObject<Request>) => {
    console.log("protoRequest", protoRequest)
    const data = await handler(protoRequest.data)

    const protoResponse: ProtoResponseObject<Response> = {
      $id: protoRequest.$id,
      type: type,
      variant: 'response',
      data,
      error: null
    }

    postMessage(JSON.stringify(protoResponse))

  }, [type, handler])

  return useCallback((event: WebViewMessageEvent, postMessage: (msg: string) => void) => {

    const protoRequest = toProtoRequest<Request>(type, event.nativeEvent.data);

    if (protoRequest) {
      invoker(protoRequest)
        .catch(e => {
          console.error("Could not handle RPC: ", e)

          const protoResponse: ProtoResponseObject<Response> = {
            $id: protoRequest.$id,
            type: type,
            variant: 'response',
            data: null,
            error: {
              message: (e as any).message ?? 'unknown error'
            }
          }

          postMessage(JSON.stringify(protoResponse))
        })
    }

  }, [type, handler, invoker])

}

function toProtoRequest<Request>(
  type: string,
  data: any,
): ProtoRequestObject<Request> | null {
  const obj = messageToObject(data);

  if (obj && obj.type === type && obj.variant === 'request') {
    return obj;
  }

  return null;
}

function messageToObject(message: string | any): any | null {
  if (message === 'string') {
    try {
      return JSON.parse(message);
    } catch (e) {
      // this might be just a string sent with sendMessage
      return null;
    }
  }

  return typeof message === 'string' ? JSON.parse(message) : message;
}

