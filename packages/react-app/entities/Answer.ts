export type Answer = {
  id: number;
  questionId: number;
  surveyId: number;
  participantWalletAddress: `0x${string}`;
  value: boolean;
  isBlank: boolean;
};
