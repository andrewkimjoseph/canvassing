import { Earning } from "@/entities/Earning";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getAllEarningsMadeByParticipant = async (
  _signerAddress: `0x${string}` | undefined,
  { _walletAddress }: GetAllEarningsMadeByParticipantProps
): Promise<Earning[]> => {
  let allEarningsMadeByParticipant: Earning[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedAllEarningsMadeByParticipant =
        (await publicClient.readContract({
          address: canvassingContractAddress,
          abi: canvassingContractABI,
          functionName: "getAllEarningsMadeByParticipant",
          args: [_walletAddress],
        })) as Array<any>;

      for (
        let earningId = 0;
        earningId < fetchedAllEarningsMadeByParticipant.length;
        earningId++
      ) {
        const earningMadeByParticipantToBeParsed =
          fetchedAllEarningsMadeByParticipant[earningId];

        const earningMadeByParticipant: Earning = {
          id: Number(earningMadeByParticipantToBeParsed["id"]),
          surveyId: Number(earningMadeByParticipantToBeParsed["surveyId"]),
          recipientWalletAddress:
            earningMadeByParticipantToBeParsed["recipientWalletAddress"],
          amountPaidOutInWei: Number(
            earningMadeByParticipantToBeParsed["amountPaidOutInWei"]
          ),
          isBlank: earningMadeByParticipantToBeParsed["isBlank"],
        };

        allEarningsMadeByParticipant.push(earningMadeByParticipant);
      }

      return allEarningsMadeByParticipant;
    } catch (err) {
      console.info(err);
      return allEarningsMadeByParticipant;
    }
  }
  return allEarningsMadeByParticipant;
};

export type GetAllEarningsMadeByParticipantProps = {
  _walletAddress: `0x${string}`;
};
