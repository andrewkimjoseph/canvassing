import { Answer } from "@/entities/Answer";
import { Participant } from "@/entities/Participant";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getAnswersOfSurvey = async (
  _signerAddress: `0x${string}` | undefined,
  { _surveyId }: GetAnswersOfSurvey
): Promise<Answer[]> => {
  let answersOfSurvey: Answer[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedAnswersOfSurvey = (await publicClient.readContract({
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "answersOfSurvey",
        args: [_surveyId],
      })) as Array<any>;

      for (
        let surveyId = 0;
        surveyId < fetchedAnswersOfSurvey.length;
        surveyId++
      ) {
        const fetchedAnswerOfSurveyToBeParsed =
          fetchedAnswersOfSurvey[surveyId];

        const fetchedAnswerOfSurvey: Answer = {
          id: Number(fetchedAnswerOfSurveyToBeParsed["id"]),
          questionId: Number(fetchedAnswerOfSurveyToBeParsed["questionId"]),
          surveyId: Number(fetchedAnswerOfSurveyToBeParsed["surveyId"]),

          participantWalletAddress:
            fetchedAnswerOfSurveyToBeParsed["participantWalletAddress"],

          value: fetchedAnswerOfSurveyToBeParsed["value"],
          isBlank: fetchedAnswerOfSurveyToBeParsed["isBlank"],
        };

        answersOfSurvey.push(fetchedAnswerOfSurvey);
      }

      return answersOfSurvey;
    } catch (err) {
      console.info(err);
      return answersOfSurvey;
    }
  }
  return answersOfSurvey;
};

export type GetAnswersOfSurvey = {
  _surveyId: number;
};
