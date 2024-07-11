import { Survey } from "@/entities/Survey";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getAllSurveys = async (
  _signerAddress: `0x${string}` | undefined,
  { _researcherWalletAddress }: GetSurveysCreatedByResearcher
): Promise<Survey[]> => {
  let allSurveys: Survey[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedSurveys =
        (await publicClient.readContract({
          address: canvassingContractAddress,
          abi: canvassingContractABI,
          functionName: "getAllSurveys",
        })) as Array<any>;

      for (
        let surveyId = 0;
        surveyId < fetchedSurveys.length;
        surveyId++
      ) {
        const surveyToBeParsed =
        fetchedSurveys[surveyId];

        const createdSurvey: Survey = {
          id: Number(surveyToBeParsed["id"]),
          creatingResearcherWalletAddress:
          surveyToBeParsed["attendingUserWalletAddress"],
          topic: surveyToBeParsed["topic"],

          numberOfQuestions: Number(
            surveyToBeParsed["numberOfQuestions"]
          ),
          targetNumberOfParticipants: Number(
            surveyToBeParsed["targetNumberOfParticipants"]
          ),
          amountFundedInWei: Number(
            surveyToBeParsed["amountFundedInWei"]
          ),
          isBlank: surveyToBeParsed["isBlank"],
        };

        allSurveys.push(createdSurvey);
      }

      return allSurveys;
    } catch (err) {
      console.info(err);
      return allSurveys;
    }
  }
  return allSurveys;
};

export type GetSurveysCreatedByResearcher = {
  _researcherWalletAddress: `0x${string}`;
};
