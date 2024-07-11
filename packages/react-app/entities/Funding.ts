export type Funding = {
  id: number;
  surveyId: number;
  creatingResearcherWalletAddress: `0x${string}`;
  amountFundedInWei: number;
  isBlank: boolean;
};
