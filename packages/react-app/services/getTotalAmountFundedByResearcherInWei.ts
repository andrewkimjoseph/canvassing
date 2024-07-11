import { createPublicClient, createWalletClient, custom, http } from "viem";
import { celoAlfajores } from "viem/chains";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";

export const getTotalAmountFundedByResearcherInWei = async (
    _signerAddress: `0x${string}` | undefined,
    {
        _creatingResearcherWalletAddress
    }: GetTotalAmountFundedByResearcherInWei
): Promise<number> => {

    let totalAmountFundedByResearcherInWei: number = 0
    if (window.ethereum) {
        try {
            const publicClient = createPublicClient({
                chain: celoAlfajores,
                transport: custom(window.ethereum),
            });
            totalAmountFundedByResearcherInWei = Number(
                (await publicClient.readContract({
                    address: canvassingContractAddress,
                    abi: canvassingContractABI,
                    functionName: "getTotalAmountFundedByResearcherInWei",
                    args: [_creatingResearcherWalletAddress],
                })) ?? 0
            );


            return totalAmountFundedByResearcherInWei;

        } catch (error) {
            return totalAmountFundedByResearcherInWei;
        }
    }
    return totalAmountFundedByResearcherInWei;
};

export type GetTotalAmountFundedByResearcherInWei = {
    _creatingResearcherWalletAddress: `0x${string}`
};
