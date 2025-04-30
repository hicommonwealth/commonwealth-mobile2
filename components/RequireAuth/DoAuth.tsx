import { usePrivy} from '@privy-io/expo';
import {PrivyLogin} from "@/components/PrivyLogin/PrivyLogin";

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

  return children

}
