export type Survey = {
  id: number;
  creatingResearcherWalletAddress: `0x${string}`;
  topic: string;
  numberOfQuestions: number;
  targetNumberOfParticipants: number;
  amountFundedInWei: number;
  isBlank: boolean;
};
