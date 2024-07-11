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
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import { createResearcher } from "@/services/createResearcher";
export default function ParticipantBecomeOne() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [industry, setIndustry] = useState("Finance");
  const [numberOfEmployees, setNumberOfEmployees] = useState("10 +");
  const [yearsInOperation, setYearsInOperation] = useState("5 - 10");
  const [creatingResearcher, setIsCreatingResearch] = useState(false);

  const createParticipantAccount = async () => {
    setIsCreatingResearch(true);

    const researcherIsCreated = await createResearcher(address, {
      _walletAddress: address as `0x${string}`,
      _industry: industry,
      _numberOfEmployees: numberOfEmployees,
      _yearsInOperation: yearsInOperation,
    });

    if (researcherIsCreated) {
    } else {
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
    return null;
  }

  return (
    <div className="flex flex-col items-left py-2 mx-4 h-svh relative">
      <Text fontSize={"14"} align={"left"} onClick={() => router.back()}>
        Go back
      </Text>
      <Text fontWeight={"bold"} fontSize={"20"} mt={2} mb={1}>
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
          value={industry}
          onChange={(event) => {
            setIndustry(event.target.value);
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Select>

        <Text fontSize={"12"} mb={1}>
          Country:
        </Text>
        <Select
          bgColor={"#F5E8C7"}
          value={numberOfEmployees}
        //   onChange={(event) => {
        //     setNumberOfEmployees(event.target.value);
        //   }}
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
            placeholder="e.g. You know what DeFi is"
            focusBorderColor="#363062"
            borderColor={"#C0D6E8"}
            bgColor={"#F5E8C7"}
            type="number"
            // onChange={(event) => {
            //     setQuestionOne(event.target.value);
            // }}
          />
      </Stack>

      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      {/* <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        
      >
        <ModalOverlay />
        <ModalContent mx={16} borderRadius={10}>
          <ModalHeader>Modal Title</ModalHeader>
          {/* <ModalCloseButton /> */}
          {/* <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              You can scroll the content behind the modal
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor={"black"}
              color={"white"}
              onClick={onClose}
              width={"full"}
              borderRadius={10}
            >
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          {/* </ModalFooter>
        </ModalContent>
      </Modal> */}

      <Button
        // onClick={createResearcherAccount}

        onClick={() =>
          router.push(
           "/participant/become-one/success"
            
          )
        }
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
        Create your participant account
      </Button>
    </div>
  );
}

export type ResearchAccountCreationErrors = {
  category: "industry" | "numberOfEmployees" | "yearsInOperation";
  isInvalid: boolean;
};
