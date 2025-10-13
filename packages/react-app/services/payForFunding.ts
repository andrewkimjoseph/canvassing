import {
    createPublicClient,
    createWalletClient,
    custom,
    parseEther,
} from "viem";
import { celoSepolia } from "viem/chains";
import { cUSDSepoliaContractAddress } from "@/utils/addresses/cUSDAlfajoresContractAddresses";
import { cUSDAlfajoresContractABI } from "@/utils/abis/cUSDAlfajoresContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import { canvassingWalletAddress } from "@/utils/addresses/canvassingWalletAddress";

export const payForFunding = async (
    _signerAddress: `0x${string}` | undefined, { _amountOfFundingOfSurveyInWei }: PayForFundingProps
): Promise<boolean> => {
    if (window.ethereum) {
        const privateClient = createWalletClient({
            chain: celoSepolia,
            transport: custom(window.ethereum),
        });
        const publicClient = createPublicClient({
            chain: celoSepolia,
            transport: custom(window.ethereum),
        });
        const [address] = await privateClient.getAddresses();
        try {
            const payForFundingTxnHash = await privateClient.writeContract({
                account: address,
                address: cUSDSepoliaContractAddress,
                abi: cUSDAlfajoresContractABI,
                functionName: "transfer",
                args: [canvassingContractAddress, _amountOfFundingOfSurveyInWei],
            });

            const payForFundingTxnReceipt =
                await publicClient.waitForTransactionReceipt({
                    hash: payForFundingTxnHash,
                });

            if (payForFundingTxnReceipt.status == "success") {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }
    return false;
};

export type PayForFundingProps = {
    _amountOfFundingOfSurveyInWei: number;
};
