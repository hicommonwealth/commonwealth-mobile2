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

  // FIXME ...
  const {user} = usePrivy();
  useOAuthTokens({
    onOAuthTokenGrant: tokens => {
      console.log("FIXME: got tokens: ", JSON.stringify(tokens, null, 2))
    }
  })


  if (!user) {
    return <PrivyLogin/>
  }

  console.log("FIXME: PRIVY_DEBUG: " + config.PRIVY_DEBUG);

  if (config.PRIVY_DEBUG) {
    return (
      <AuthDebug/>
    )
  }

  return children

}
