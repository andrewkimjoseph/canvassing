export type Participant = {
  id: number;
  walletAddress: `0x${string}`;
  gender: string;
  country: string;
  yearOfBirth: number;
  totalNumberOfSurveysTaken: number;
  isResearcher: boolean;
  isBlank: boolean;
};
