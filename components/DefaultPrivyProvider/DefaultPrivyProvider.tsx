import React, { memo } from 'react';
import { LoadPrivy } from './LoadPrivy';
import { WaitForPrivy } from './WaitForPrivy';
import { config } from '@/util/config';

type DefaultPrivyProviderProps = {
  children: React.ReactNode;
};

export const DefaultPrivyProvider = memo(function DefaultPrivyProvider(
  props: DefaultPrivyProviderProps,
) {
  const { children } = props;

  if (!config.PRIVY_MOBILE_ENABLED) {
    return children;
  }

  // NOTE normally, we would NOT mount the privy components, if the privy
  // feature flag was false, however, Privy won't work with that configuration.
  return (
    <LoadPrivy>
      <WaitForPrivy>{children}</WaitForPrivy>
    </LoadPrivy>
  );
});
