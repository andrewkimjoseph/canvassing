import { Survey } from "@/entities/Survey";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getSurveysCreatedByResearcher = async (
  _signerAddress: `0x${string}` | undefined,
  { _researcherWalletAddress }: GetSurveysCreatedByResearcher
): Promise<Survey[]> => {
  let surveysCreatedByResearcher: Survey[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedSurveysCreatedByResearcher =
        (await publicClient.readContract({
          address: canvassingContractAddress,
          abi: canvassingContractABI,
          functionName: "getSurveysCreatedByResearcher",
          args: [_researcherWalletAddress],
        })) as Array<any>;

      for (
        let surveyId = 0;
        surveyId < fetchedSurveysCreatedByResearcher.length;
        surveyId++
      ) {
        const createdSurveyToBeParsed =
          fetchedSurveysCreatedByResearcher[surveyId];

        const createdSurvey: Survey = {
          id: Number(createdSurveyToBeParsed["id"]),
          creatingResearcherWalletAddress:
            createdSurveyToBeParsed["attendingUserWalletAddress"],
          topic: createdSurveyToBeParsed["topic"],

          numberOfQuestions: Number(
            createdSurveyToBeParsed["numberOfQuestions"]
          ),
          targetNumberOfParticipants: Number(
            createdSurveyToBeParsed["targetNumberOfParticipants"]
          ),
          amountFundedInWei: Number(
            createdSurveyToBeParsed["amountFundedInWei"]
          ),
          isBlank: createdSurveyToBeParsed["isBlank"],
        };

        surveysCreatedByResearcher.push(createdSurvey);
      }

      return surveysCreatedByResearcher;
    } catch (err) {
      console.info(err);
      return surveysCreatedByResearcher;
    }
  }
  return surveysCreatedByResearcher;
};

export type GetSurveysCreatedByResearcher = {
  _researcherWalletAddress: `0x${string}` | undefined;
};
