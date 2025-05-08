import {useCallback} from "react";
import {WebViewMessageEvent} from "react-native-webview";

type EvenSubscribeMessage<EventData> = {
  $id: string;
  type: string;
  variant: 'event-subscribe';
};


/**
 * Wraps a response so that it includes the error OR data.
 */
type EventUpdateMessage<EventData> = {
  $id: string;
  type: string;
  variant: 'event-update';
  data: EventData
};

export function useMobileRPCEventBroadcaster<EventData>(type: string,
                                                        listener: (callback: (update: EventData) => void) => void) {

  return useCallback((event: WebViewMessageEvent, postMessage: (msg: string) => void) => {

    const subscribeMessage = toEvenSubscribeMessage<Request>(type, event.nativeEvent.data);

    if (subscribeMessage) {
      listener((update: EventData) => {
        const eventObject: EventUpdateMessage<EventData> = {
          $id: subscribeMessage.$id,
          type: type,
          variant: 'event-update',
          data: update,
        }

        console.log("FIXME sending eventObject:", JSON.stringify(eventObject, null, 2))

        postMessage(JSON.stringify(eventObject))
      })
    }


  }, [type])

}

function toEvenSubscribeMessage<Request>(
  type: string,
  data: any,
): EvenSubscribeMessage<Request> | null {
  const obj = messageToObject(data);

  if (obj && obj.type === type && obj.variant === 'event-subscribe') {
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

