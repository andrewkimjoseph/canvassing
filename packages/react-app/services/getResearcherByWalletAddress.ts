import { Researcher } from "@/entities/Researcher";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { celoAlfajores } from "viem/chains";

export const getResearcherByWalletAddress = async (
  _signerAddress: `0x${string}` | undefined,
  { _walletAddress }: GetResearcherByWalletAddress
): Promise<Researcher | null> => {
  let researcher: Researcher | null = null;
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedResearcher = await publicClient.readContract({
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "getResearcherByWalletAddress",
        args: [_walletAddress],
      }) as any;

      researcher = {
        id: Number(fetchedResearcher["id"]),
        walletAddress: fetchedResearcher["walletAddress"],
        industry: fetchedResearcher["industry"],
        numberOfEmployees: fetchedResearcher["numberOfEmployees"],
        yearsInOperation: fetchedResearcher["yearsInOperation"],
        isParticipant: fetchedResearcher["isParticipant"],
        isVerified: fetchedResearcher["isVerified"],
        isBlank: fetchedResearcher["isBlank"]
      };
      
      return researcher;
    } catch (err) {
      console.info(err);
      return researcher;
    }
  }
  return null;
};

export type GetResearcherByWalletAddress = {
  _walletAddress: `0x${string}`;
};