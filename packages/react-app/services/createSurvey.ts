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

export const createSurvey = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _researcherWalletAddress,
    _topic,
    _numberOfQuestions,
    _targetNumberOfParticipants,
    _questionSentences,
    _amountFundedForSurvey,
  }: CreateSurveyProps
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
      const createSurveyTxnHash = await privateClient.writeContract({
        account: address,
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "createSurvey",
        args: [
          _researcherWalletAddress,
          _topic,
          _numberOfQuestions,
          _targetNumberOfParticipants,
          _questionSentences,
          _amountFundedForSurvey,
        ],
      });

      const createSurveyTxnReceipt = await publicClient.waitForTransactionReceipt(
        {
          hash: createSurveyTxnHash,
        }
      );

      if (createSurveyTxnReceipt.status == "success") {
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

export type CreateSurveyProps = {
  _researcherWalletAddress: `0x${string}`;
  _topic: string;
  _numberOfQuestions: number;
  _targetNumberOfParticipants: number;
  _questionSentences: string[];
  _amountFundedForSurvey: number;
};
