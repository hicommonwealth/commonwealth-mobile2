import React, {ReactNode} from "react";
import {
  KnockExpoPushNotificationProvider,
  KnockProvider,
} from "@knocklabs/expo";

type Props = {
  userId: number
}

// https://docs.knock.app/sdks/expo/push-notifications
// https://docs.knock.app/integrations/push/expo#how-to-configure-expo-with-knock
export default function Notifications(props: Props) {

  // TODO get the notifications from the react-native bridge ...
  return (
    <KnockProvider apiKey="pk_test_Hd4ZpzlVcz9bqepJQoo9BvZHokgEqvj4T79fPdKqpYM" userId={`${props.userId}`}>
      <KnockExpoPushNotificationProvider knockExpoChannelId="c416d699-c6ac-4288-8d76-9a792cf53ffa">
        <>
        </>
      </KnockExpoPushNotificationProvider>
    </KnockProvider>
  )

}
