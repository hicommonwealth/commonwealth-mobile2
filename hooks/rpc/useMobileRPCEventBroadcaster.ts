import {useCallback} from "react";
import {WebViewMessageEvent} from "react-native-webview";

type EvenSubscribeMessage = {
  $id: string;
  type: string;
  variant: 'event-subscribe';
  eventName: string;
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
                                                        listener: (eventName: string, callback: (update: EventData) => void) => void) {

  return useCallback((event: WebViewMessageEvent, postMessage: (msg: string) => void) => {

    const subscribeMessage = toEvenSubscribeMessage<Request>(type, event.nativeEvent.data);

    if (subscribeMessage) {
      listener(subscribeMessage.eventName, (update: EventData) => {
        const eventObject: EventUpdateMessage<EventData> = {
          $id: subscribeMessage.$id,
          type: type,
          variant: 'event-update',
          data: update,
        }

        postMessage(JSON.stringify(eventObject))
      })
    }


  }, [type])

}

function toEvenSubscribeMessage<Request>(
  type: string,
  data: any,
): EvenSubscribeMessage | null {
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

