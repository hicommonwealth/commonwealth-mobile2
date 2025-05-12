import {useOAuthTokens, usePrivy} from '@privy-io/expo';
import {PrivyLogin} from "@/components/PrivyLogin/PrivyLogin";
import {AuthDebug} from "@/components/RequireAuth/AuthDebug";
import {config} from "@/util/config";

type Props = {
  children: React.ReactNode;
}

/**
 * MUST be broken out because we can't call usePrivy if privy is not enabled.
 */
export const DoAuth = (props: Props) => {

  const { children } = props;

  const {user} = usePrivy();

  if (!user) {
    return <PrivyLogin/>
  }

  if (config.PRIVY_DEBUG) {
    return (
      <AuthDebug/>
    )
  }

  return children

}
