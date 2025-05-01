// START privy polyfills
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';
// END privy polyfills

import {PrivyProvider} from '@privy-io/expo';
import React, {memo} from 'react';
import {config} from "@/util/config";
import {PrivyFonts} from "@/components/PrivyFonts/PrivyFonts";

type DefaultPrivyProvider = {
  children: React.ReactNode;
};

/**
 * Load privy. The polyfills MUST be loaded above via imports. They CANNOT be
 * loaded elsewhere.
 */
export const LoadPrivy = memo(function LoadPrivy(props: DefaultPrivyProvider) {
  const { children } = props;

  return (
    <>
      <PrivyFonts />
      <PrivyProvider
        appId={config.PRIVY_APP_ID}
        clientId={config.PRIVY_CLIENT_ID}
        config={{
          embedded: {
            ethereum: {
              createOnLogin: 'users-without-wallets',
            },
          },
        }}>
        {children}
      </PrivyProvider>
    </>
  );
});
