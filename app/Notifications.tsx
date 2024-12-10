import React, {ReactNode} from "react";
import {
  KnockProvider,
  KnockExpoPushNotificationProvider,
} from "@knocklabs/expo";

type Props = {
  children: ReactNode
}

export default function Notifications(props: Props) {

  // FIXME how do I get the knock user ID???
  return (
    <KnockProvider apiKey="{YOUR_KNOCK_PUBLIC_API_KEY}" userId="{YOUR_USER_ID}">
      <KnockExpoPushNotificationProvider knockExpoChannelId="{YOUR_KNOCK_EXPO_CHANNEL_ID}">
        <>
          {props.children}
        </>
      </KnockExpoPushNotificationProvider>
    </KnockProvider>
  )

}
