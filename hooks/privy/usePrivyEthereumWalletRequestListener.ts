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
      throw new Error("No wallets for usePrivyEthereumWalletRequestListener")
    }

    const wallet = wallets[0]; // Replace this with your desired wallet
    const provider = await wallet.getProvider();


    const result = await provider.request(request)
    return result;
  }, [wallets])

  return useMobileRPCReceiver<RequestArguments, any>('privy.ethereumWalletRequest', handler)

}

