import {
    createPublicClient,
    createWalletClient,
    custom,
    parseEther,

} from "viem";
import { celoAlfajores } from "viem/chains";
import { cUSDAlfajoresContractAddress } from "@/utils/addresses/cUSDAlfajoresContractAddresses";
import { cUSDAlfajoresContractABI } from "@/utils/abis/cUSDAlfajoresContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";

export const sendVerificationFunds = async (
    _signerAddress: `0x${string}` | undefined
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
            const sendVerificationFundsTxnHash = await privateClient.writeContract({
                account: address,
                address: cUSDAlfajoresContractAddress,
                abi: cUSDAlfajoresContractABI,
                functionName: "transfer",
                args: [canvassingContractAddress, parseEther("1")],
            });

            const sendVerificationFundsTxnReceipt =
                await publicClient.waitForTransactionReceipt({
                    hash: sendVerificationFundsTxnHash,
                });

            if (sendVerificationFundsTxnReceipt.status == "success") {
                return true;
            }
            return false;

        } catch (error) {
            return false;
        }
    }
    return false;
};