import {usePrivy} from '@privy-io/expo';
import React, {memo} from 'react';
import {LoadingView} from "@/components/LoadingView/LoadingView";

type WaitForPrivyProps = {
  children: React.ReactNode;
};

export const WaitForPrivy = memo(function WaitForPrivy(
  props: WaitForPrivyProps,
) {
  const { children } = props;

  const { isReady } = usePrivy();

  if (!isReady) {
    return (
      <LoadingView/>
    );
  }

  return (
    <>
      {children}
    </>
  )
});
