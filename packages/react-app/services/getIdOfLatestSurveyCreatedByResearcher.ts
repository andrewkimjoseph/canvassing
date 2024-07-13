import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";

export const getIdOfLatestSurveyCreatedByResearcher = async (
    _signerAddress: `0x${string}` | undefined,
    {
        _creatingResearcherWalletAddress

    }: GetIdOfLatestSurveyCreatedByResearcherProps
): Promise<number> => {

    let amountOfFundingOfSurveyInWei: number = 0
    if (window.ethereum) {
        try {
            const publicClient = createPublicClient({
                chain: celoAlfajores,
                transport: custom(window.ethereum),
            });
            amountOfFundingOfSurveyInWei = Number(
                (await publicClient.readContract({
                    address: canvassingContractAddress,
                    abi: canvassingContractABI,
                    functionName: "getIdOfLatestSurveyCreatedByResearcher",
                    args: [_creatingResearcherWalletAddress],
                })) ?? 0
            );


            return amountOfFundingOfSurveyInWei;

        } catch (error) {
            return amountOfFundingOfSurveyInWei;
        }
    }
    return amountOfFundingOfSurveyInWei;
};

export type GetIdOfLatestSurveyCreatedByResearcherProps = {
    _creatingResearcherWalletAddress: `0x${string}`;
};
