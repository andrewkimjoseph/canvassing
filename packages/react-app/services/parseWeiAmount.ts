import { formatUnits } from "viem/utils";

export const parseAmountInWeiToEther = (amount: number) => {
    return Number(formatUnits(BigInt(amount ?? 0), 18));
  };