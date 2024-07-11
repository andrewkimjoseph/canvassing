import { canvassingContractABI } from "@/utils/abis/canvassingContractABI";
import { canvassingContractAddress } from "@/utils/addresses/canvassingContractAddress";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  parseTransaction,
} from "viem";
import { celoAlfajores } from "viem/chains";

export const createParticipant = async (
  _signerAddress: `0x${string}` | undefined,
  { _walletAddress, _gender, _country, _yearOfBirth }: CreateParticipantProps
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
      const createParticipantTxnHash = await privateClient.writeContract({
        account: address,
        address: canvassingContractAddress,
        abi: canvassingContractABI,
        functionName: "createParticipant",
        args: [_walletAddress, _gender, _country, _yearOfBirth],
      });

      const createParticipantTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: createParticipantTxnHash,
        });

      if (createParticipantTxnReceipt.status == "success") {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  return false;
};

export type CreateParticipantProps = {
  _walletAddress: `0x${string}`;
  _gender: string;
  _country: string;
  _yearOfBirth: number;
};
