import React from "react";
import {
  KnockExpoPushNotificationProvider,
  KnockProvider,
} from "@knocklabs/expo";
import { KNOCK_PUBLIC_API_KEY, KNOCK_EXPO_CHANNEL_ID } from '@env';

type Props = {
  userId: number
  knockJWT: string
}

// https://docs.knock.app/sdks/expo/push-notifications
// https://docs.knock.app/integrations/push/expo#how-to-configure-expo-with-knock
// https://docs.knock.app/sdks/react-native/push-notifications

// https://docs.expo.dev/push-notifications/sending-notifications-custom/

export default function ExpoNotifications(props: Props) {

  console.log('knock initialized with', {
    KNOCK_PUBLIC_API_KEY, KNOCK_EXPO_CHANNEL_ID, userId: props.userId,
  });

  // TODO get the notifications from the react-native bridge ...
  return (
    <KnockProvider apiKey={KNOCK_PUBLIC_API_KEY}
                   userId={`${props.userId}`}
                   userToken={props.knockJWT}>
      <KnockExpoPushNotificationProvider knockExpoChannelId={KNOCK_EXPO_CHANNEL_ID}>
        <>
        </>
      </KnockExpoPushNotificationProvider>
    </KnockProvider>
  )

}
