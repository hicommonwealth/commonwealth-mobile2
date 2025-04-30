import {config} from "@/util/config"
import {DoAuth} from "@/components/RequireAuth/DoAuth";

type Props = {
  children: React.ReactNode;
}

export const RequireAuth = (props: Props) => {

  const { children } = props;

  if (! config.PRIVY_ENABLED) {
    return children
  }

  return <DoAuth>{children}</DoAuth>

}
