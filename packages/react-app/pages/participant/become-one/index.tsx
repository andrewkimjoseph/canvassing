import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import { createResearcher } from "@/services/createResearcher";
import { createParticipant } from "@/services/createParticipant";
export default function ParticipantBecomeOne() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [gender, setGender] = useState("O");
  const [country, setCountry] = useState("KEN");
  const [yearOfBirth, setYearOfBirth] = useState(2000);

  const [creatingParticipant, setCreatingParticipant] = useState(false);

  const createParticipantAccount = async () => {
    setCreatingParticipant(true);

    const participantIsCreated = await createParticipant(address, {
      _walletAddress: address as `0x${string}`,
      _gender: gender,
      _country: country,
      _yearOfBirth: yearOfBirth,
    });

    if (participantIsCreated) {
      await router.replace("/participant/become-one/success");

    }
    setCreatingParticipant(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  if (!isMounted) {
    return (
      <div className="flex flex-col justify-center h-screen items-center mb-24">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-left py-2 mx-4 h-svh relative">
      <Text fontSize={"14"} align={"left"} onClick={() => router.back()}>
        Go back
      </Text>
      <Text fontWeight={"bold"} fontSize={"20"} mt={2}>
        Become a Participant
      </Text>
      <Image
        // paddingY={8}
        height={"200px"}
        width={"200px"}
        src="/participant.png"
        alt="Home image"
      />

      <Text fontWeight={"bold"} fontSize={"16"} mt={1} mb={1}>
        Enter Details
      </Text>

      <Stack spacing={1}>
        <Text fontSize={"12"} mb={1}>
          Gender:
        </Text>
        <Select
          bgColor={"#F5E8C7"}
          focusBorderColor="#363062"
          value={gender}
          onChange={(event) => {
            setGender(event.target.value);
          }}
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </Select>

        <Text fontSize={"12"} mb={1}>
          Country:
        </Text>
        <Select
          bgColor={"#F5E8C7"}
          focusBorderColor="#363062"
          value={country}
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        >
          <option value="KEN">Kenya</option>
          <option value="UGN">Uganda</option>
          <option value="NIG">Nigeria</option>
          <option value="GHN">Ghana</option>
          <option value="RSA">South Africa</option>
        </Select>

        <Text fontSize={"12"} mb={1}>
          Year of Birth:
        </Text>
        <Input
          variant="outline"
          placeholder="YYYY"
          focusBorderColor="#363062"
          borderColor={"#C0D6E8"}
          bgColor={"#F5E8C7"}
          type="number"
          value={yearOfBirth}
          onChange={(event) => {
            setYearOfBirth(Number(event.target.value));
          }}
        />
      </Stack>

      <Button
        onClick={createParticipantAccount}
        isLoading={creatingParticipant}
        mb={24}
        bottom={0}
        position={"absolute"}
        loadingText="Creating your participant account"
        borderRadius={"10"}
        width={"full"}
        bgColor={"#363062"}
        textColor={"white"}
        _hover={{
          bgColor: "#363062",
          textColor: "white",
        }}
      >
        Create your participant account
      </Button>
    </div>
  );
}

export type ResearchAccountCreationErrors = {
  category: "industry" | "numberOfEmployees" | "yearsInOperation";
  isInvalid: boolean;
};
