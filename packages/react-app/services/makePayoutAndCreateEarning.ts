import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  parseTransaction,
} from "viem";
import { celoAlfajores } from "viem/chains";

export const makePayoutAndCreateEarning = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _surveyId,
    _participantWalletAddress,
  }: MakePayoutAndCreateEarningProps
): Promise<boolean> => {
  if (window.ethereum) {
    const privateClient = createWalletClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    const [address] = await privateClient.getAddresses();
    try {
      const makePayoutAndCreateEarningTxnHash = await privateClient.writeContract({
        account: address,
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "makePayoutAndCreateEarning",
        args: [_surveyId, _participantWalletAddress],
      });

      const makePayoutAndCreateEarningTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: makePayoutAndCreateEarningTxnHash,
        });

      if (makePayoutAndCreateEarningTxnReceipt.status == "success") {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  return false;
};

export type MakePayoutAndCreateEarningProps = {
  _surveyId: number;
  _participantWalletAddress: `0x${string}`;
};
