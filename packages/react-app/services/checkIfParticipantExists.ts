import { createPublicClient, createWalletClient, custom, http } from "viem";
import { celoAlfajores } from "viem/chains";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";

export const checkIfParticipantExists = async (
  _signerAddress: `0x${string}` | undefined
): Promise<boolean> => {
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      try {
        const participantExists = await publicClient.readContract({
          address: canvassingContractAddress,
          abi: canvassingContractABI,
          functionName: "checkIfParticipantExists",
          args: [_signerAddress],
        });
        return participantExists as boolean;
      } catch (err) {
        console.error(err);
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
};
