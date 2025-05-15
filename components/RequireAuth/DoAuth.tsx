import {useOAuthTokens, usePrivy} from '@privy-io/expo';
import {PrivyLogin} from "@/components/PrivyLogin/PrivyLogin";
import {AuthDebug} from "@/components/RequireAuth/AuthDebug";
import {config} from "@/util/config";
import {DebugGestureView} from "@/components/DebugGestureView/DebugGestureView";
import {usePrivyAuthStatus} from "@/components/RequireAuth/PrivyAuthContext";

type Props = {
  children: React.ReactNode;
}

/**
 * MUST be broken out because we can't call usePrivy if privy is not enabled.
 */
export const DoAuth = (props: Props) => {

  const { children } = props;

  const authStatus = usePrivyAuthStatus()
  const {user} = usePrivy();

  if (!authStatus.userAuth) {
    return (
      <DebugGestureView>
        <PrivyLogin/>
      </DebugGestureView>
    )
  }

  if (config.PRIVY_DEBUG) {
    return (
      <AuthDebug/>
    )
  }

  return children

}
