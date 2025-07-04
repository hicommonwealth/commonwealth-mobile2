import {useEmbeddedEthereumWallet} from "@privy-io/expo";
import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/hooks/rpc/useMobileRPCReceiver";

type RequestArguments = {
  method: string;
  params?: Array<any> | undefined;
};

export function usePrivyEthereumWalletRequestListener() {
  const {wallets} = useEmbeddedEthereumWallet();

  const handler = useCallback(async (request: RequestArguments): Promise<any> => {

    if (wallets.length === 0) {
      // WARN: we can NOT throw an error here because it should never happen
      // in production anyway, but the webapp seems to send lagging wallet
      // requests and postMessage is handled during the login process
      // which will trigger this and then throw a false error to the user.
      console.log("WARN: No wallets for usePrivyEthereumWalletRequestListener")
      return {}
    }

    const wallet = wallets[0]; // Replace this with your desired wallet
    const provider = await wallet.getProvider();


    const result = await provider.request(request)
    return result;
  }, [wallets])

  return useMobileRPCReceiver<RequestArguments, any>('privy.ethereumWalletRequest', handler)

}

