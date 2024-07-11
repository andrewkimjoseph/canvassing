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

export const createFunding = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _numberOfQuestions,
    _targetNumberOfParticipants,
    _surveyId,
    _researcherWalletAddress,
  }: CreateFundingProps
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
      const createFundingTxnHash = await privateClient.writeContract({
        account: address,
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "createFunding",
        args: [
          _numberOfQuestions,
          _targetNumberOfParticipants,
          _surveyId,
          _researcherWalletAddress,
        ],
      });

      const createFundingTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: createFundingTxnHash,
        });

      if (createFundingTxnReceipt.status == "success") {
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

export type CreateFundingProps = {
  _numberOfQuestions: number;
  _targetNumberOfParticipants: number;
  _surveyId: number;
  _researcherWalletAddress: `0x${string}`;
};
