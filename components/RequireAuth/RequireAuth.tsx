import {config} from "@/util/config"
import {DoAuth} from "@/components/RequireAuth/DoAuth";
import {PrivyElements} from "@privy-io/expo/ui";
import React, {memo} from "react";

type Props = {
  children: React.ReactNode;
}

export const RequireAuth = memo(function (props: Props){

  const { children } = props;

  if (! config.PRIVY_ENABLED) {
    return children
  }

  return (
    <>
      <PrivyElements/>
      <DoAuth>{children}</DoAuth>
    </>
  )

})
