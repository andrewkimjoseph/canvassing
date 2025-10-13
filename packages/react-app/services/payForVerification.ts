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

export const payForVerification = async (
    _signerAddress: `0x${string}` | undefined,
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
            const payForVerificationTxnHash = await privateClient.writeContract({
                account: address,
                address: cUSDSepoliaContractAddress,
                abi: cUSDAlfajoresContractABI,
                functionName: "transfer",
                args: [canvassingWalletAddress, parseEther("1")],
            });

            const payForVerificationTxnReceipt =
                await publicClient.waitForTransactionReceipt({
                    hash: payForVerificationTxnHash,
                });

            if (payForVerificationTxnReceipt.status == "success") {
                return true;
            }
            return false;

        } catch (error) {
            return false;
        }
    }
    return false;
};