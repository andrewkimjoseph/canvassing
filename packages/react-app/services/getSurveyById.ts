import { Survey } from "@/entities/Survey";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getSurveyById = async (
  _signerAddress: `0x${string}` | undefined,
  { _surveyId }: GetSurveyByIdProps
): Promise<Survey | null> => {
  let survey: Survey | null = null;
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedSurvey = (await publicClient.readContract({
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "getSurveyById",
        args: [_surveyId],
      })) as any;

      survey = {
        id: Number(fetchedSurvey["id"]),
        creatingResearcherWalletAddress:
          fetchedSurvey["attendingUserWalletAddress"],
        topic: fetchedSurvey["topic"],
        numberOfQuestions: Number(fetchedSurvey["numberOfQuestions"]),
        targetNumberOfParticipants: Number(
          fetchedSurvey["targetNumberOfParticipants"]
        ),
        amountFundedInWei: Number(fetchedSurvey["amountFundedInWei"]),
        isBlank: fetchedSurvey["isBlank"],
      };

      return survey;
    } catch (err) {
      console.info(err);
      return survey;
    }
  }
  return survey;
};

export type GetSurveyByIdProps = {
  _surveyId: number;
};
