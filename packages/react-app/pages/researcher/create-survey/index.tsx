import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  Box,
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
export default function ResearcherCreateSurvey() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [topic, setTopic] = useState("");
  const [targetNumberOfParticipants, setTargetNumberOfParticipants] = useState(5);

  const [industry, setIndustry] = useState("Finance");
  const [numberOfEmployees, setNumberOfEmployees] = useState("10 +");
  const [yearsInOperation, setYearsInOperation] = useState("5 - 10");
  const [creatingResearcher, setIsCreatingResearch] = useState(false);

  const [questionOne, setQuestionOne] = useState("");
  const [questionTwo, setQuestionTwo] = useState("");
  const [questionThree, setQuestionThree] = useState("");


  const createResearcherAccount = async () => {
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
        New True/False Survey
      </Text>
      {/* <Image
        // paddingY={8}
        height={"200px"}
        width={"200px"}
        src="/researcher.png"
        alt="Home image"
      />
   */}

      {/* <Text fontWeight={"bold"} fontSize={"16"} mt={1} mb={1}>
        Select Details
      </Text> */}

      <Stack spacing={1}>
        <Box className="flex flex-col justify-between w-full mt-2 ">
          <Text fontSize={"12"} mb={1}>
            Topic:
          </Text>
          <Input
            variant="outline"
            placeholder="e.g. DeFi, MiniPay UX"
            focusBorderColor="#363062"
            borderColor={"#C0D6E8"}
            bgColor={"#F5E8C7"}
            onChange={(event) => {
                setTopic(event.target.value);
              }}
          />
        </Box>

        <Box className="flex flex-col justify-between w-full mt-2 ">
          <Text fontSize={"12"} mb={1}>
            Target Number of Participants:
          </Text>

          <Select
            bgColor={"#F5E8C7"}
            value={yearsInOperation}
            focusBorderColor="#363062"
            onChange={(event) => {
                setTargetNumberOfParticipants(Number(event.target.value));
            }}
          >
            <option value="5">5</option>
            <option value="5">7</option>
            <option value="9">9</option>
          </Select>
          {/* <Input
            variant="outline"
            borderColor={"#C0D6E8"}
            placeholder="Flushed"
            focusBorderColor="#F5E8C7"
            bgColor={""}
          /> */}
        </Box>
        <Box className="flex flex-col justify-between w-full mt-2 ">
          <Text fontSize={"12"} mb={1}>
            Question 1:
          </Text>
          <Input
            variant="outline"
            placeholder="e.g. You know what DeFi is"
            focusBorderColor="#363062"
            borderColor={"#C0D6E8"}
            bgColor={"#F5E8C7"}
            onChange={(event) => {
                setQuestionOne(event.target.value);
            }}
          />
        </Box>
        <Box className="flex flex-col justify-between w-full mt-2 ">
          <Text fontSize={"12"} mb={1}>
            Question 2:
          </Text>
          <Input
            variant="outline"
            placeholder="e.g. You have used DeFi before"
            focusBorderColor="#363062"
            borderColor={"#C0D6E8"}
            bgColor={"#F5E8C7"}
            onChange={(event) => {
                setQuestionTwo(event.target.value);
            }}
          />
        </Box>
        <Box className="flex flex-col justify-between w-full mt-2 ">
          <Text fontSize={"12"} mb={1}>
            Question 3:
          </Text>
          <Input
            variant="outline"
            placeholder="e.g. DeFi is a challenge space"
            focusBorderColor="#363062"
            borderColor={"#C0D6E8"}
            bgColor={"#F5E8C7"}
            onChange={(event) => {
                setQuestionThree(event.target.value);
            }}
          />
        </Box>
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
          router.push({
            pathname: "/researcher/create-survey/confirm",
            query: {
              topic: topic,
              targetNumberOfParticipants: targetNumberOfParticipants,
              questionOne: questionOne,
              questionTwo: questionTwo,
              questionThree: questionThree,
            },
          })
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
        Confirm survey
      </Button>
    </div>
  );
}

export type ResearchAccountCreationErrors = {
  category: "industry" | "numberOfEmployees" | "yearsInOperation";
  isInvalid: boolean;
};
