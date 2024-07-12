import { Answer } from "@/entities/Answer";
import { Participant } from "@/entities/Participant";
import { Question } from "@/entities/Question";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getQuestionsOfSurvey = async (
  _signerAddress: `0x${string}` | undefined,
  { _surveyId }: GetAnswersOfSurvey
): Promise<Question[]> => {
  let questionsOfSurvey: Question[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedQuestionsOfSurvey = (await publicClient.readContract({
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "getQuestionsOfSurvey",
        args: [_surveyId],
      })) as Array<any>;

      for (
        let questionId = 0;
        questionId < fetchedQuestionsOfSurvey.length;
        questionId++
      ) {
        const fetchedQuestionOfSurveyToBeParsed =
          fetchedQuestionsOfSurvey[questionId];

        const fetchedQuestionOfSurvey: Question = {
          id: Number(fetchedQuestionOfSurveyToBeParsed["id"]),
          surveyId: Number(fetchedQuestionOfSurveyToBeParsed["surveyId"]),
          sentence: fetchedQuestionOfSurveyToBeParsed["sentence"],
          isBlank: fetchedQuestionOfSurveyToBeParsed["isBlank"],
        };

        questionsOfSurvey.push(fetchedQuestionOfSurvey);
      }

      return questionsOfSurvey;
    } catch (err) {
      console.info(err);
      return questionsOfSurvey;
    }
  }
  return questionsOfSurvey;
};

export type GetAnswersOfSurvey = {
  _surveyId: number;
};
