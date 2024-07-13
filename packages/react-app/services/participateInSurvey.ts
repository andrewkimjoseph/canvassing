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

export const participateInSurvey = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _surveyId,
    _participantWalletAddress,
    _answerValues,
    _questionIds
  }: ParticipateInSurveyProps
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
      const participateInSurveyTxnHash = await privateClient.writeContract({
        account: address,
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "participateInSurvey",
        args: [_surveyId, _participantWalletAddress, _answerValues, _questionIds],
      });

      const participateInSurveyTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: participateInSurveyTxnHash,
        });

      if (participateInSurveyTxnReceipt.status == "success") {
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

export type ParticipateInSurveyProps = {
  _surveyId: number;
  _participantWalletAddress: `0x${string}`;
  _answerValues: boolean[];
  _questionIds: number[]
};
