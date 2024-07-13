import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  AbsoluteCenter,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Circle,
  Divider,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Spinner,
  Square,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { checkIfParticipantExists } from "@/services/checkIfParticipantExists";
import { checkIfResearcherExists } from "@/services/checkIfResearcherExists";
import router, { useRouter } from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Researcher } from "@/entities/Researcher";
import { Survey } from "@/entities/Survey";
import { Question } from "@/entities/Question";
import { getAmountOfEarningPerParticipantForSurveyInWei } from "@/services/getAmountOfEarningPerParticipantForSurveyInWei";
import { getQuestionsOfSurvey } from "@/services/getQuestionsOfSurvey";
import { getResearcherByWalletAddress } from "@/services/getResearcherByWalletAddress";
import { getSurveyById } from "@/services/getSurveyById";
import { participateInSurvey } from "@/services/participateInSurvey";
import { makePayoutAndCreateEarning } from "@/services/makePayoutAndCreateEarning";

export default function ParticipantParticularSurvey() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const toast = useToast();

  const [allQuestionsOfSurvey, setAllQuestionsOfSurvey] = useState<Question[]>(
    []
  );


  const [answerToQuestion, setAnswerToQuestion] = useState<{ [key: number]: string }>({});;

  const [isCompleting, setIsCompleting] = useState(false);


  const router = useRouter();
  const { id } = router.query;

  const surveyId: number = Number(id);


  const getAnswerValues = async (): Promise<boolean[]> => {
    const answerValues: boolean[] = [];
  
    for (const [answerId, question] of allQuestionsOfSurvey.entries()) {
      if (answerToQuestion.hasOwnProperty(question.id)) {
        answerValues.push(answerToQuestion[question.id] === "true");
      }
    }
  
    return answerValues;
  };


  const onClickComplete = async () => {
    setIsCompleting(true);

    const answerValues = await getAnswerValues();

    if (answerValues.length === 0) {
      toast({
        description: "Answer at least one question",
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      setIsCompleting(false);
      return;
    }

    if (answerValues.length < allQuestionsOfSurvey.length) {
      toast({
        description: "Answer all questions",
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      setIsCompleting(false);

      return;
    }

    const participantHasParticipatedInSurvey = await participateInSurvey(
      address,
      {
        _surveyId: surveyId,
        _participantWalletAddress: address as `0x${string}`,
        _answerValues: await getAnswerValues(),
        _questionIds: allQuestionsOfSurvey.map((question) => question.id),
      }
    );

    if (participantHasParticipatedInSurvey) {
      const payoutIsMadeAndEarningIsCreated = await makePayoutAndCreateEarning(
        address,
        {
          _surveyId: surveyId,
          _participantWalletAddress: address as `0x${string}`,
        }
      );

      if (payoutIsMadeAndEarningIsCreated) {
        toast({
          description:
            "Participation successful. Check your balance for earnings!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        setIsCompleting(false);
        router.replace("/participant");
      }
    } else {
      toast({
        description: "Survey participation failed/cancelled.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setIsCompleting(false);
    }
  };

  useEffect(() => {
    console.log(answerToQuestion);
  }, [answerToQuestion]);
  useEffect(() => {

    const fetchQuestionsOfSurvey = async () => {
      const fetchedQuestions = await getQuestionsOfSurvey(address, {
        _surveyId: surveyId,
      });

      setAllQuestionsOfSurvey(fetchedQuestions);
    };

    fetchQuestionsOfSurvey();
  }, []);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswerToQuestion(prevState => ({
      ...prevState,
      [questionId]: value
    }));
  };


  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col justify-center h-screen items-center mb-24">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-left py-2 mx-4 h-svh relative">
      <Text fontSize={"14"} onClick={() => router.back()}>
        Back
      </Text>

      <div className="flex flex-row w-full my-2">
        <Text fontWeight={"bold"} fontSize={"20"}>
          Taking Survey {surveyId}
        </Text>
      </div>
      <Divider className="mt-1" />

      <Text fontWeight={"bold"} fontSize={"18"} my={2}>
        Questions
      </Text>

      {allQuestionsOfSurvey.map((question) => (
        <div key={question.id}>
          <div className="flex flex-row justify-between w-full mb-4 mt-2">
            <div className="flex flex-col left-10 ">
              <Text fontSize={"14px"}>
                Question {allQuestionsOfSurvey.indexOf(question) + 1}
              </Text>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full mb-2">
            <Text fontWeight={"n"} fontStyle={"italic"} fontSize={"16px"}>
              {question.sentence}
            </Text>
          </div>

          <div className="flex flex-row justify-between w-full my-2">
            {/* <Avatar name="Dan Abrahmov" color={"black"} bgColor={"#F5E8C7"} /> */}
            <RadioGroup
               onChange={(value) => handleAnswerChange(question.id, value)}
               value={answerToQuestion[question.id] || ''}
            >
              <Stack direction="row">
                <Radio value={"true"} colorScheme={"blue"}>
                  <Text fontWeight={"bold"} fontSize={"14px"}>
                    True
                  </Text>
                </Radio>
                <Radio value={"false"}>
                  <Text fontWeight={"bold"} fontSize={"14px"}>
                    False
                  </Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </div>

          <Divider />
        </div>
      ))}

      <Button
        // onClick={createResearcherAccount}

        onClick={onClickComplete}
        isLoading={isCompleting}
        mb={24}
        bottom={0}
        position={"absolute"}
        // isDisabled={getAnswerValues()}
        loadingText="Participating and earning"
        borderRadius={"10"}
        width={"full"}
        bgColor={"#363062"}
        textColor={"white"}
        _hover={{
          bgColor: "#363062",
          textColor: "white",
        }}
      >
        Complete
      </Button>
    </div>
  );
}
