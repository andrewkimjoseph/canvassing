export type Earning = {
  id: number;
  surveyId: number;
  recipientWalletAddress: `0x${string}`;
  amountPaidOutInWei: number;
  isBlank: boolean;
};
