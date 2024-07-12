import { Participant } from "@/entities/Participant";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { celoAlfajores } from "viem/chains";

export const getParticipantByWalletAddress = async (
  _signerAddress: `0x${string}` | undefined,
  { _walletAddress }: GetParticipantByWalletAddressProps
): Promise<Participant | null> => {
  let participant: Participant | null = null;
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedParticipant = await publicClient.readContract({
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "getParticipantByWalletAddress",
        args: [_walletAddress],
      }) as any;

      participant = {
        id: Number(fetchedParticipant["id"]),
        walletAddress: fetchedParticipant["walletAddress"],
        gender: fetchedParticipant["gender"],
        country: fetchedParticipant["country"],
        yearOfBirth: Number(fetchedParticipant["yearOfBirth"]),
        totalNumberOfSurveysTaken: Number(fetchedParticipant["totalNumberOfSurveysTaken"]),
        isResearcher: fetchedParticipant["isResearcher"],
        isBlank: fetchedParticipant["isBlank"]


      };
      
      return participant;
    } catch (err) {
      console.info(err);
      return participant;
    }
  }
  return null;
};

export type GetParticipantByWalletAddressProps = {
  _walletAddress: `0x${string}`;
};