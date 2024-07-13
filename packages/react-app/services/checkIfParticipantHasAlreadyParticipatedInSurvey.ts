import { createPublicClient, createWalletClient, custom, http } from "viem";
import { celoAlfajores } from "viem/chains";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";

export const checkIfParticipantHasAlreadyParticipatedInSurvey = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _participantWalletAddress,
    _surveyId,
  }: CheckIfParticipantHasAlreadyParticipatedInSurveyProps
): Promise<boolean> => {
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      try {
        const participantExists = await publicClient.readContract({
          address: canvassingContractAddress,
          abi: canvassingContractABI,
          functionName: "checkIfParticipantHasAlreadyParticipatedInSurvey",
          args: [_participantWalletAddress, _surveyId],
        });
        return participantExists as boolean;
      } catch (err) {
        console.error(err);
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
};

export type CheckIfParticipantHasAlreadyParticipatedInSurveyProps = {
  _participantWalletAddress: `0x${string}`;
  _surveyId: number;
};
