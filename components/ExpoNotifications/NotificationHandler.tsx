import {useEffect} from "react";
import { useExpoPushNotifications } from "@knocklabs/expo";
import * as Notifications from "expo-notifications";
import {Linking} from "react-native";

type Props = {
  onLink: (link: string) => void;
}

export const NotificationHandler = (props: Props) => {

  const {onNotificationReceived, onNotificationTapped} = useExpoPushNotifications()

  useEffect(() => {
    onNotificationReceived((notification) => {

      const event_data = notification.request.content.data

      if (! event_data) {
        console.warn("No event data found in notification")
        return;
      }

      console.log("event_data", JSON.stringify(event_data, null, 2))

      console.log("Notification received:", JSON.stringify(notification, null, 2));

      const title = event_data.notification?.title || event_data.title || 'No title';
      const body =
        event_data.notification?.body ||
        event_data.body ||
        event_data.comment_body ||
        'No body';

      // Notifications.scheduleNotificationAsync({
      //   content: {
      //     title,
      //     body,
      //     sound: 'default',
      //   },
      //   trigger: null,
      // }).catch(console.error);

    });

    onNotificationTapped((response) => {
      // handle linking here...
      console.log("Notification tapped:", JSON.stringify(response, null, 2));

      const event_data = response.notification.request.content;

      if (! event_data) {
        console.warn("No event data found in notification")
        return;
      }

      const url =
        event_data?.data.notification?.url ||
        event_data?.data?.url ||
        event_data?.data?.comment_url ||
        event_data?.data?.object_url ||
        event_data?.data?.community_stakes_url ||
        'https://common.xyz';

      props.onLink(url);

    });
  }, []);

  return null;

};
