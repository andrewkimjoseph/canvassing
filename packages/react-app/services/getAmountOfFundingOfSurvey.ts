import { createPublicClient, createWalletClient, custom, http } from "viem";
import { celoAlfajores } from "viem/chains";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";

export const getAmountOfFundingOfSurvey = async (
    _signerAddress: `0x${string}` | undefined,
    {
        _numberOfQuestions,
        _targetNumberOfParticipants,
    }: GetAmountOfFundingOfSurvey
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
                    functionName: "getAmountOfFundingOfAnySurveyInWei",
                    args: [_numberOfQuestions, _targetNumberOfParticipants],
                })) ?? 0
            );


            return amountOfFundingOfSurveyInWei;

        } catch (error) {
            return amountOfFundingOfSurveyInWei;
        }
    }
    return amountOfFundingOfSurveyInWei;
};

export type GetAmountOfFundingOfSurvey = {
    _numberOfQuestions: number;
    _targetNumberOfParticipants: number;
};
