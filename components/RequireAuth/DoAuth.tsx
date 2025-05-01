import { usePrivy} from '@privy-io/expo';
import {PrivyLogin} from "@/components/PrivyLogin/PrivyLogin";
import {AuthDebug} from "@/components/RequireAuth/AuthDebug";

type Props = {
  children: React.ReactNode;
}

/**
 * When true, we do not login to the main app, but instead, we load a debug
 * component to show auth settings.
 */
const ENABLE_AUTH_DEBUG = true

/**
 * MUST be broken out because we can't call usePrivy if privy is not enabled.
 */
export const DoAuth = (props: Props) => {

  const { children } = props;
  const {user} = usePrivy();

  if (!user) {
    return <PrivyLogin/>
  }

  if (ENABLE_AUTH_DEBUG) {
    return (
      <AuthDebug/>
    )
  }

  return children

}
