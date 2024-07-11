import { createPublicClient, createWalletClient, custom, http } from "viem";
import { celoAlfajores } from "viem/chains";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";

export const getAmountOfEarningPerParticipantForSurveyInWei = async (
  _signerAddress: `0x${string}` | undefined,
  { _surveyId }: GetAmountOfEarningPerParticipantForSurveyInWeiProps
): Promise<number> => {
  let amountOfEarningPerParticipantForSurveyInWei: number = 0;
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      amountOfEarningPerParticipantForSurveyInWei = Number(
        (await publicClient.readContract({
          address: canvassingContractAddress,
          abi: canvassingContractABI,
          functionName: "getAmountOfEarningPerParticipantForSurveyInWei",
          args: [_surveyId],
        })) ?? 0
      );

      return amountOfEarningPerParticipantForSurveyInWei;
    } catch (error) {
      return amountOfEarningPerParticipantForSurveyInWei;
    }
  }
  return amountOfEarningPerParticipantForSurveyInWei;
};

export type GetAmountOfEarningPerParticipantForSurveyInWeiProps = {
  _surveyId: number;
};
