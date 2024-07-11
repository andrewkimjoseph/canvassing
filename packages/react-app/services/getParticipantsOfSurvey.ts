import { Participant } from "@/entities/Participant";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getParticipantsOfSurvey = async (
  _signerAddress: `0x${string}` | undefined,
  { _surveyId }: GetParticipantsOfSurveyProps
): Promise<Participant[]> => {
  let participantsOfSurvey: Participant[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedParticipantsOfSurvey = (await publicClient.readContract({
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "getParticipantsOfSurvey",
        args: [_surveyId],
      })) as Array<any>;

      for (
        let surveyId = 0;
        surveyId < fetchedParticipantsOfSurvey.length;
        surveyId++
      ) {
        const fetchedParticipantOfSurveyToBeParsed =
          fetchedParticipantsOfSurvey[surveyId];

        const fetchedParticipantOfSurvey: Participant = {
          id: Number(fetchedParticipantOfSurveyToBeParsed["id"]),
          walletAddress: fetchedParticipantOfSurveyToBeParsed["walletAddress"],
          gender: fetchedParticipantOfSurveyToBeParsed["gender"],
          country: fetchedParticipantOfSurveyToBeParsed["country"],

          yearOfBirth: Number(
            fetchedParticipantOfSurveyToBeParsed["yearOfBirth"]
          ),

          totalNumberOfSurveysTaken: Number(
            fetchedParticipantOfSurveyToBeParsed["totalNumberOfSurveysTaken"]
          ),
          isResearcher: fetchedParticipantOfSurveyToBeParsed["isResearcher"],
          isBlank: fetchedParticipantOfSurveyToBeParsed["isBlank"],
        };

        participantsOfSurvey.push(fetchedParticipantOfSurvey);
      }

      return participantsOfSurvey;
    } catch (err) {
      console.info(err);
      return participantsOfSurvey;
    }
  }
  return participantsOfSurvey;
};

export type GetParticipantsOfSurveyProps = {
  _surveyId: number;
};
