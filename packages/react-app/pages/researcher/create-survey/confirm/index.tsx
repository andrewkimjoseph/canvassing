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
import router, { useRouter } from "next/router";
import { createResearcher } from "@/services/createResearcher";

export default function ResearcherCreateSurveyConfirm() {
  const router = useRouter();
  const {
    topic,
    targetNumberOfParticipants,
    questionOne,
    questionTwo,
    questionThree,
  } = router.query;

  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [creatingResearcher, setIsCreatingResearch] = useState(false);

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
        Confirm New True/False Survey
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
            disabled={true}
            borderColor={"#C0D6E8"}
            variant="outline"
            placeholder="e.g. DeFi, MiniPay UX"
            focusBorderColor="#363062"
            bgColor={"#C0D6E8"}
            value={topic}

          />
        </Box>

        <Box className="flex flex-col justify-between w-full mt-2 ">
          <Text fontSize={"12"} mb={1}>
            Target Number of Participants:
          </Text>

          <Input
            disabled={true}
            borderColor={"#C0D6E8"}
            variant="outline"
            placeholder="e.g. DeFi, MiniPay UX"
            focusBorderColor="#363062"
            bgColor={"#C0D6E8"}
            value={targetNumberOfParticipants}

          />

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
            disabled={true}
            borderColor={"#C0D6E8"}
            bgColor={"#C0D6E8"}
            value={questionOne}
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
            bgColor={"#C0D6E8"}
            disabled={true}
            borderColor={"#C0D6E8"}
            value={questionTwo}
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
            disabled={true}
            borderColor={"#C0D6E8"}
            bgColor={"#C0D6E8"}
            value={questionThree}
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

        onClick={() => router.push("/researcher/become-one/success")}
        isLoading={creatingResearcher}
        mb={24}
        bottom={0}
        position={"absolute"}
        // marginTop={"4"}
        loadingText="Funding and publishing survey"
        borderRadius={"10"}
        width={"full"}
        bgColor={"#363062"}
        textColor={"white"}
        _hover={{
          bgColor: "#363062",
          textColor: "white",
        }}
      >
        Fund and publish your survey
      </Button>
    </div>
  );
}

export type ResearchAccountCreationErrors = {
  category: "industry" | "numberOfEmployees" | "yearsInOperation";
  isInvalid: boolean;
};
