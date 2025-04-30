import React from "react";

// START privy polyfills
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';
// END privy polyfills

type Props = {
  children: React.ReactNode;
}

/**
 * Just imports the polyfills we need for privy.
 *
 * Documented here:
 *
 * https://docs.privy.io/basics/react-native/installation#configure-polyfills
 */
export const PrivyPolyfills = (props: Props) => {
  return props.children
}
