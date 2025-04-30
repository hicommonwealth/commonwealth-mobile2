// START privy polyfills
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';
// END privy polyfills

import {PrivyProvider} from '@privy-io/expo';
import React, {memo} from 'react';
import {config} from "@/util/config";

type DefaultPrivyProvider = {
  children: React.ReactNode;
};

export const LoadPrivy = memo(function LoadPrivy(props: DefaultPrivyProvider) {
  const { children } = props;

  if (!config.PRIVY_APP_ID) return <div>Privy not configured in .env</div>;

  return (
    <PrivyProvider
      appId={config.PRIVY_APP_ID}
      clientId={config.PRIVY_CLIENT_ID}>
      {children}
    </PrivyProvider>
  );
});
