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
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import { createResearcher } from "@/services/createResearcher";
import { getAmountOfFundingOfSurvey } from "@/services/getAmountOfFundingOfSurveyInWei";
import { parseAmountInWeiToEther } from "@/services/parseWeiAmount";
import { payForFunding } from "@/services/payForFunding";
import { createSurvey } from "@/services/createSurvey";
import { createFunding } from "@/services/createFunding";
import { getIdOfLatestSurveyCreatedByResearcher } from "@/services/getIdOfLatestSurveyCreatedByResearcher";

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

  const [isFundingAndCreatingSurvey, setIsFundingAndCreatingSurvey] =
    useState(false);

  const [amountOfFundingOfSurvey, setAmountOfFundingOfSurvey] = useState(0);

  const [questions, setQuestions] = useState<string[]>([]);

  const getTotalNumberOfQuestions = (): number => {
    let totalNumberOfQuestions: number = 0;

    if (Number(questionOne?.length) > 0) {
      totalNumberOfQuestions += 1;
    }

    if (Number(questionTwo?.length) > 0) {
      totalNumberOfQuestions += 1;
    }

    if (Number(questionThree?.length) > 0) {
      totalNumberOfQuestions += 1;
    }

    return totalNumberOfQuestions;
  };

  const getTargetNumberOfParticipants = (): number => {
    return Number(targetNumberOfParticipants);
  };

  const onClickFundAndPublishSurvey = async () => {
    setIsFundingAndCreatingSurvey(true);
    // 1. Fund survey

    const surveyIsFunded = await payForFunding(address, {
      _amountOfFundingOfSurveyInWei: amountOfFundingOfSurvey,
    });

    if (surveyIsFunded) {
      // 2. Create survey
      const surveyIsCreated = await createSurvey(address, {
        _researcherWalletAddress: address as `0x${string}`,
        _topic: String(topic),
        _numberOfQuestions: getTotalNumberOfQuestions(),
        _amountFundedForSurvey: parseAmountInWeiToEther(
          amountOfFundingOfSurvey
        ),
        _targetNumberOfParticipants: getTargetNumberOfParticipants(),
        _questionSentences: questions,
      });

      if (surveyIsCreated) {
        // Get the survey Id
        const surveyId = await getIdOfLatestSurveyCreatedByResearcher(address, {
          _creatingResearcherWalletAddress: address as `0x${string}`,
        });

        const fundingIsCreated = await createFunding(address, {
          _numberOfQuestions: getTotalNumberOfQuestions(),
          _targetNumberOfParticipants: getTargetNumberOfParticipants(),
          _surveyId: surveyId,
          _researcherWalletAddress: address as `0x${string}`,
        });

        if (fundingIsCreated) {
          toast({
            description: "Survey funded and created successfully.",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });

          await router.replace("/researcher");
        } else {
          toast({
            description: "Survey funding creation failed.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }
      } else {
        toast({
          description: "Survey creation failed.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        setIsFundingAndCreatingSurvey(false);
      }
    } else {
      toast({
        description: "Survey funding failed.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setIsFundingAndCreatingSurvey(false);
    }

    // 2. Create survey
    // 3. Create funding
  };

  useEffect(() => {
    const getAmountOfFundingOfSurveyFn = async () => {
      console.log(getTotalNumberOfQuestions());
      console.log(getTargetNumberOfParticipants());

      const fetchedAmountOfFundingOfSurvey = await getAmountOfFundingOfSurvey(
        address,
        {
          _numberOfQuestions: getTotalNumberOfQuestions(),
          _targetNumberOfParticipants: getTargetNumberOfParticipants(),
        }
      );
      setAmountOfFundingOfSurvey(fetchedAmountOfFundingOfSurvey);

      return fetchedAmountOfFundingOfSurvey;
    };

    const setQuestionsOfSurvey = async () => {
      const runningQuestions: string[] = [];

      if (Number(questionOne?.length) > 0) {
        runningQuestions.push(String(questionOne));
      }

      if (Number(questionTwo?.length) > 0) {
        runningQuestions.push(String(questionTwo));
      }

      if (Number(questionThree?.length) > 0) {
        runningQuestions.push(String(questionThree));
      }

      setQuestions(runningQuestions);
    };

    setQuestionsOfSurvey();
    getAmountOfFundingOfSurveyFn();
  }, []);

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
            value={!!questionOne ? questionOne : "Not given"}
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
            value={!!questionTwo ? questionTwo : "Not given"}
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
            value={!!questionThree ? questionThree : "Not given"}
          />
        </Box>

        <Box className="flex flex-col justify-between w-full mt-2 ">
          <Text fontSize={"12"} mb={1}>
            Amount to Fund:
          </Text>
          <Input
            variant="outline"
            placeholder="e.g. DeFi is a challenge space"
            focusBorderColor="#363062"
            disabled={true}
            color={"white"}
            borderColor={"#C0D6E8"}
            bgColor={"#363062"}
            value={`${parseAmountInWeiToEther(amountOfFundingOfSurvey)} cUSD`}
          />
        </Box>
      </Stack>

      <Button
        onClick={onClickFundAndPublishSurvey}
        isLoading={isFundingAndCreatingSurvey}
        mb={24}
        bottom={0}
        position={"absolute"}
        // marginTop={"4"}
        isDisabled={getTotalNumberOfQuestions() === 0}
        loadingText="Funding and creating survey"
        borderRadius={"10"}
        width={"full"}
        bgColor={"#363062"}
        textColor={"white"}
        _hover={{
          bgColor: "#363062",
          textColor: "white",
        }}
      >
        Fund and create your survey
      </Button>
    </div>
  );
}

export type ResearchAccountCreationErrors = {
  category: "industry" | "numberOfEmployees" | "yearsInOperation";
  isInvalid: boolean;
};
