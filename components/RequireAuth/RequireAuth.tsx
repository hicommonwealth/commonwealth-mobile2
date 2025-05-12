import {config} from "@/util/config"
import {DoAuth} from "@/components/RequireAuth/DoAuth";
import {PrivyElements} from "@privy-io/expo/ui";
import React, {memo} from "react";
import {PrivyAuthStatusProvider} from "@/components/RequireAuth/PrivyAuthContext";

type Props = {
  children: React.ReactNode;
}

export const RequireAuth = memo(function (props: Props){

  const { children } = props;

  if (! config.PRIVY_MOBILE_ENABLED) {
    // two component levels are required here.  if Auth is not enabled, we have
    // to return BEFORE we try to use the privy load.
    return children
  }

  // TODO: add the PrivyElements color scheme here...

  return (
    <PrivyAuthStatusProvider>
      <PrivyElements config={{
        mfa: {
          enableMfaVerificationUIs: true
        }
      }}/>
      <DoAuth>{children}</DoAuth>
    </PrivyAuthStatusProvider>
  )

})
