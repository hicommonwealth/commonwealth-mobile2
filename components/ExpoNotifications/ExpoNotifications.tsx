import React, {useEffect} from "react";
import {
  KnockExpoPushNotificationProvider,
  KnockProvider,
} from "@knocklabs/expo";
import * as Notifications from 'expo-notifications';
import {
  NotificationHandler
} from "@/components/ExpoNotifications/NotificationHandler";
import {config} from "@/util/config";
import KNOCK_EXPO_CHANNEL_ID = config.KNOCK_EXPO_CHANNEL_ID;
import KNOCK_PUBLIC_API_KEY = config.KNOCK_PUBLIC_API_KEY;

type Props = {
  userId: number
  knockJWT: string
  onLink: (link: string) => void;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// https://docs.knock.app/sdks/expo/push-notifications
// https://docs.knock.app/integrations/push/expo#how-to-configure-expo-with-knock
// https://docs.knock.app/sdks/react-native/push-notifications
// https://docs.knock.app/integrations/push/expo

// https://docs.expo.dev/push-notifications/sending-notifications-custom/

export default function ExpoNotifications(props: Props) {

  console.log("Listening for permissions with user ID: ", props.userId);

  console.log('knock initialized with', {
    KNOCK_PUBLIC_API_KEY, KNOCK_EXPO_CHANNEL_ID, userId: props.userId,
  });

  return (
    <KnockProvider apiKey={KNOCK_PUBLIC_API_KEY}
                   userId={`${props.userId}`}
                   userToken={props.knockJWT}>
      <KnockExpoPushNotificationProvider knockExpoChannelId={KNOCK_EXPO_CHANNEL_ID}>
        <>
          <NotificationHandler onLink={props.onLink}/>
        </>
      </KnockExpoPushNotificationProvider>
    </KnockProvider>
  )

}
