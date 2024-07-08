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

export const createResearcher = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _walletAddress,
    _industry,
    _numberOfEmployees,
    _yearsInOperation,
  }: CreateResearcherProps
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
      const createResearcherEventTxn = await privateClient.writeContract({
        account: address,
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "createResearcher",
        args: [
          _walletAddress,
          _industry,
          _numberOfEmployees,
          _yearsInOperation,
        ],
      });

      const createResearcherEventTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: createResearcherEventTxn,
        });

      if (createResearcherEventTxnReceipt.status == "success") {
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

export type CreateResearcherProps = {
  _walletAddress: `0x${string}` ;
  _industry: string;
  _numberOfEmployees: string;
  _yearsInOperation: string;
};
