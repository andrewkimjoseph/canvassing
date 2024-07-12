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
  Spacer,
  Spinner,
  Square,
  Text,
} from "@chakra-ui/react";
import { checkIfParticipantExists } from "@/services/checkIfParticipantExists";
import { checkIfResearcherExists } from "@/services/checkIfResearcherExists";
import router, { useRouter } from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Researcher } from "@/entities/Researcher";
import { getResearcherByWalletAddress } from "@/services/getResearcherByWalletAddress";
import { Survey } from "@/entities/Survey";
import { Question } from "@/entities/Question";
import { getSurveyById } from "@/services/getSurveyById";
import { getQuestionsOfSurvey } from "@/services/getQuestionsOfSurvey";
import { getAmountOfEarningPerParticipantForSurveyInWei } from "@/services/getAmountOfEarningPerParticipantForSurveyInWei";
import { parseAmountInWeiToEther } from "@/services/parseWeiAmount";
import { makePayoutAndCreateEarning } from "@/services/makePayoutAndCreateEarning";
import { participateInSurvey } from "@/services/participateInSurvey";
import { checkIfParticipantHasAlreadyParticipatedInSurvey } from "@/services/checkIfParticipantHasAlreadyParticipatedInSurvey";

export default function ParticipantParticularSurvey() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  const [researcherOfSurvey, setResearcherOfSurvey] =
    useState<Researcher | null>(null);



    const [hasParticipated, setHasParticipated] = useState(false);
    //   //checkIfParticipantHasAlreadyParticipatedInSurvey

  const [allQuestionsOfSurvey, setAllQuestionsOfSurvey] = useState<Question[]>(
    []
  );

  const [amountOfEarningPerParticipant, setAmountOfEarningPerParticipant] =
    useState(0);

  const router = useRouter();
  const { id } = router.query;

  const surveyId: number = Number(id);

  useEffect(() => {
    const fetchResearcherOfSurveyByWalletAddress = async () => {
      const fetchedResearcherOfSurvey = await getResearcherByWalletAddress(
        address,
        {
          _walletAddress: address as `0x${string}`,
        }
      );

      setResearcherOfSurvey(fetchedResearcherOfSurvey);
    };


    const fetchQuestionsOfSurvey = async () => {
      const fetchedQuestions = await getQuestionsOfSurvey(address, {
        _surveyId: surveyId,
      });

      setAllQuestionsOfSurvey(fetchedQuestions);
    };

    const getAmountOfPotentialEarningsOfSurvey = async () => {
      const fetchedAmount =
        await getAmountOfEarningPerParticipantForSurveyInWei(address, {
          _surveyId: surveyId,
        });

      setAmountOfEarningPerParticipant(fetchedAmount);
    };


    const checkIfHasParticipated = async () => {
      const hasParticipated =
        await checkIfParticipantHasAlreadyParticipatedInSurvey(address, {
          _participantWalletAddress: address as `0x${string}`,
          _surveyId: surveyId,
        });

      setHasParticipated(hasParticipated);
    };
    fetchResearcherOfSurveyByWalletAddress();
    fetchQuestionsOfSurvey();
    getAmountOfPotentialEarningsOfSurvey();
    checkIfHasParticipated();
  }, []);

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
          Survey {surveyId}
        </Text>

        <Popover>
          <PopoverTrigger>
            <Box>
              {researcherOfSurvey?.isVerified && (
                <Square size="25px" color="white" ml={2} mt={1}>
                  <Image my={4} src="/checkmark.png" alt="Home image" />
                </Square>
              )}
            </Box>
          </PopoverTrigger>
          <PopoverContent color="#363062" bg="#c0d6e8">
            <PopoverArrow bg="#c0d6e8" />

            <PopoverBody>Reseacher is verified</PopoverBody>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-row justify-between w-full mt-2 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Total Questions
        </Text>

        <Button
          onClick={() => {}}
          borderRadius={"10"}
          width={"1/6"}
          bgColor={"#C0D6E8"}
          textColor={"black"}
          fontWeight={"bold"}
          fontSize={"14px"}
        >
          {allQuestionsOfSurvey.length}
        </Button>
      </div>

      <div className="flex flex-row justify-between w-full mt-2 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Potential Earnings
        </Text>

        <Button
          // onClick={() => router.push("/researcher")}
          // marginTop={"4"}
          borderRadius={"10"}
          width={"1/6"}
          bgColor={"#F5E8C7"}
          textColor={"black"}
          fontWeight={"bold"}
          fontSize={"14px"}
        >
          {parseAmountInWeiToEther(amountOfEarningPerParticipant)} cUSD
        </Button>
      </div>

      <Divider className="mt-3" />

      <Text fontWeight={"bold"} fontSize={"18"} my={3}>
        Questions
      </Text>

      <Accordion allowToggle>
        {allQuestionsOfSurvey.map((question) => (
          <div key={question.id}>
            <AccordionItem>
              <AccordionButton>
                <div className="flex flex-row justify-between w-full">
                  <Box as="span" textAlign="left">
                    Question {allQuestionsOfSurvey.indexOf(question) + 1}
                  </Box>
                  <AccordionIcon />
                </div>
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text fontWeight={"n"} fontStyle={"italic"} fontSize={"16px"}>
                  {question.sentence}
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <Divider />
          </div>
        ))}
      </Accordion>

      <Button
        // onClick={createResearcherAccount}

        onClick={() => router.push(`/participant/view-survey/${surveyId}/participate`)}
        // isLoading={creatingResearcher}
        mb={24}
        bottom={0}
        position={"absolute"}
        isDisabled={hasParticipated}
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
        {`${hasParticipated ? "Already participated" : "Participate"}`}
      </Button>
    </div>
  );
}
