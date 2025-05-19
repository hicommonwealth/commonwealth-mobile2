import {useCallback, useMemo} from "react";
import {useEmbeddedEthereumWallet} from "@privy-io/expo";

export function useSignMessageWithRequest() {
  const {wallets} = useEmbeddedEthereumWallet();

  const signMessage = useCallback(async (opts: {message: string}): Promise<{signature: string}> => {

    const {message} = opts

    if (wallets.length === 0) {
      throw new Error("No wallets")
    }

    const wallet = wallets[0]; // Replace this with your desired wallet
    const provider = await wallet.getProvider();

    console.log("Signing with wallet: " + wallet)

    const signature = await provider.request({method: 'personal_sign', params: [message, wallet.address]})

    if (typeof signature === 'string') {
      // the result type of signMessage is wrong.
      return {signature};
    }

    throw new Error("Unable to sign... ")

  }, [wallets])

  return useMemo(() => {
    return {
      signMessage
    }
  }, [signMessage])

}
