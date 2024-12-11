import React, {ReactNode} from "react";
import {
  KnockExpoPushNotificationProvider,
  KnockProvider,
} from "@knocklabs/expo";

type Props = {
}

// https://docs.knock.app/sdks/expo/push-notifications
export default function Notifications(props: Props) {

  // TODO get the notifications from the react-native bridge ...
  return (
    <KnockProvider apiKey="pk_test_Hd4ZpzlVcz9bqepJQoo9BvZHokgEqvj4T79fPdKqpYM" userId="2">
      <KnockExpoPushNotificationProvider knockExpoChannelId="fc6e68e5-b7b9-49c1-8fab-6dd7e3510ffb}">
        <>
        </>
      </KnockExpoPushNotificationProvider>
    </KnockProvider>
  )

}
