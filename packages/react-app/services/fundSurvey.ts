import {
  createPublicClient,
  createWalletClient,
  custom,
  parseEther,
} from "viem";
import { celoAlfajores } from "viem/chains";
import { cUSDAlfajoresContractAddress } from "@/utils/addresses/cUSDAlfajoresContractAddresses";
import { cUSDAlfajoresContractABI } from "@/utils/abis/cUSDAlfajoresContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";

export const fundSurvey = async (
  _signerAddress: `0x${string}` | undefined,
  { _amountToFundSurveyInWei }: FundSurveyProps
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
      const fundSurveyTxnHash = await privateClient.writeContract({
        account: address,
        address: cUSDAlfajoresContractAddress,
        abi: cUSDAlfajoresContractABI,
        functionName: "transfer",
        args: [canvassingContractAddress, _amountToFundSurveyInWei],
      });

      const fundSurveyTxnReceipt = await publicClient.waitForTransactionReceipt(
        {
          hash: fundSurveyTxnHash,
        }
      );

      if (fundSurveyTxnReceipt.status == "success") {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  return false;
};

export type FundSurveyProps = {
  _amountToFundSurveyInWei: number;
};
