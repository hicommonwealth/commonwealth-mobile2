import {useEmbeddedEthereumWallet} from "@privy-io/expo";
import {useCallback} from "react";
import {useMobileRPCReceiver} from "@/components/Webapp/useMobileRPCReceiver";

type RequestArguments = {
  method: string;
  params?: Array<any> | undefined;
};

export function usePrivyEthereumWalletRequestListener() {
  const {wallets} = useEmbeddedEthereumWallet();

  const handler = useCallback(async (request: RequestArguments): Promise<any> => {
    const wallet = wallets[0]; // Replace this with your desired wallet
    const provider = await wallet.getProvider();
    return await provider.request(request)
  }, [wallets])

  return useMobileRPCReceiver<RequestArguments, any>('privy.ethereumWalletRequest', handler)

}

