import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  parseTransaction,
} from "viem";
import { celoAlfajores } from "viem/chains";

export const verifyResearcher = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _walletAddress
  }: VerifyResearcherProps
): Promise<boolean> => {
  if (window.ethereum) {
    const privateClient = createWalletClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    const [address] = await privateClient.getAddresses();
    try {
      const verifyResearcherTxn = await privateClient.writeContract({
        account: address,
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "verifyResearcher",
        args: [
          _walletAddress,
        ],
      });

      const verifyResearcherTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: verifyResearcherTxn,
        });

      if (verifyResearcherTxnReceipt.status == "success") {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  return false;
};

export type VerifyResearcherProps = {
  _walletAddress: `0x${string}`
};
