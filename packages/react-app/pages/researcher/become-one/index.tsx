import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Image,
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
export default function ResearcherBecomeOne() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [industry, setIndustry] = useState("Finance");
  const [numberOfEmployees, setNumberOfEmployees] = useState("10 +");
  const [yearsInOperation, setYearsInOperation] = useState("5 - 10");
  const [creatingResearcher, setIsCreatingResearch] = useState(false);

  const createResearcherAccount = async () => {
    setIsCreatingResearch(true);

    const researcherIsCreated = await createResearcher(address, {
      _walletAddress: address as `0x${string}`,
      _industry: industry,
      _numberOfEmployees: numberOfEmployees,
      _yearsInOperation: yearsInOperation,
    });

    if (researcherIsCreated) {
      await router.replace("/researcher/become-one/success");
    }
    setIsCreatingResearch(false);
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
      <Spinner/>
    </div>
    );
  }

  return (
    <div className="flex flex-col items-left py-2 mx-4 h-svh relative">
      <Text fontSize={"14"} align={"left"} onClick={() => router.back()}>
        Go back
      </Text>
      <Text fontWeight={"bold"} fontSize={"20"} mt={2} mb={1}>
        Become a Researcher
      </Text>
      <Image
        // paddingY={8}
        height={"200px"}
        width={"200px"}
        src="/researcher.png"
        alt="Home image"
      />

      <Text fontWeight={"bold"} fontSize={"16"} mt={1} mb={1}>
        Select Details
      </Text>

      <Stack spacing={1}>
        <Text fontSize={"12"} mb={1}>
          Industry
        </Text>
        <Select
          bgColor={"#F5E8C7"}
          value={industry}
          onChange={(event) => {
            setIndustry(event.target.value);
          }}
        >
          <option value="Finance">Finance</option>
          <option value="Non-finance">Non-finance</option>
        </Select>

        <Text fontSize={"12"} mb={1}>
          Number of Employees
        </Text>
        <Select
          bgColor={"#F5E8C7"}
          value={numberOfEmployees}
          onChange={(event) => {
            setNumberOfEmployees(event.target.value);
          }}
        >
          <option value="0 - 5">0 - 5</option>
          <option value="5 - 10">5 - 10</option>
          <option value="10 +">10 +</option>
        </Select>

        <Text fontSize={"12"} mb={1}>
          Years in Operation
        </Text>
        <Select
          bgColor={"#F5E8C7"}
          value={yearsInOperation}
          onChange={(event) => {
            setYearsInOperation(event.target.value);
          }}
        >
          <option value="0 - 5">0 - 5</option>
          <option value="5 - 10">5 - 10 </option>
          <option value="10 +">10 +</option>
        </Select>
      </Stack>

      <Button
        onClick={createResearcherAccount}
        isLoading={creatingResearcher}
        mb={24}
        bottom={0}
        position={"absolute"}
        // marginTop={"4"}
        loadingText="Creating your researcher account"
        borderRadius={"10"}
        width={"full"}
        bgColor={"#363062"}
        textColor={"white"}
        _hover={{
          bgColor: "#363062",
          textColor: "white",
        }}
      >
        Create your researcher account
      </Button>
    </div>
  );
}

export type ResearchAccountCreationErrors = {
  category: "industry" | "numberOfEmployees" | "yearsInOperation";
  isInvalid: boolean;
};
