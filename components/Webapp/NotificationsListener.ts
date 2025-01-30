import {WebViewMessageEvent} from "react-native-webview";
import * as Notifications from "expo-notifications";

export class NotificationsListener {

  public constructor(private postMessage: (msg: string) => void,
                     private onPermissions: (status: Notifications.PermissionStatus) => void) {

    const doAsync = async () => {
      // we have to get the initial permissions or else we won't mount notifications.
      const {status} = await Notifications.getPermissionsAsync()
      this.onPermissions(status)
    }

    doAsync().catch(console.error)

  }

  public handleMessage(event: WebViewMessageEvent) {
    const msg = JSON.parse(event.nativeEvent.data);

    if (msg.type === 'Notifications.getPermissionsAsync') {

      console.log("Handling message: " + msg.type)

      const doAsync = async () => {
        const {status} = await Notifications.getPermissionsAsync()
        const __requestID = msg.__requestID

        const response = {
          type: 'Notifications.getPermissionsAsync',
          status,
          __requestID
        }

        this.postMessage(JSON.stringify(response))
      }

      doAsync().catch(console.error)

    }

    if (msg.type === 'Notifications.requestPermissionsAsync') {

      console.log("Handling message: " + msg.type)

      const doAsync = async () => {
        const {status} = await Notifications.requestPermissionsAsync()
        const __requestID = msg.__requestID

        const response = {
          type: 'Notifications.requestPermissionsAsync',
          status,
          __requestID
        }

        this.postMessage(JSON.stringify(response))
        this.onPermissions(status)
      }

      doAsync().catch(console.error)

    }

  }

}
