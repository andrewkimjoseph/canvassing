import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Circle,
  Divider,
  Image,
  Spinner,
  Square,
  Text,
} from "@chakra-ui/react";
import { checkIfParticipantExists } from "@/services/checkIfParticipantExists";
import { checkIfResearcherExists } from "@/services/checkIfResearcherExists";
import router, { useRouter } from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Earning } from "@/entities/Earning";
import { Participant } from "@/entities/Participant";
import { Survey } from "@/entities/Survey";
import { getAllEarningsMadeByParticipant } from "@/services/getAllEarningsMadeByParticipant";
import { getAllSurveys } from "@/services/getAllSurveys";
import { getParticipantByWalletAddress } from "@/services/getParticipantByWalletAddress";
import { getSurveyById } from "@/services/getSurveyById";
import { parseAmountInWeiToEther } from "@/services/parseWeiAmount";
import { Question } from "@/entities/Question";
import { getQuestionsOfSurvey } from "@/services/getQuestionsOfSurvey";
import { Answer } from "@/entities/Answer";
import { getAnswersOfSurvey } from "@/services/getAnswersOfSurvey";

export default function ParticipantParticularTakenSurvey() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  const [allEarningsMadeByParticipant, setAllEarningsMadeByParticipant] =
    useState<Earning[]>([]);

  const [allSurveys, setAllSurveys] = useState<Survey[]>([]);

  const [amountEarnedForThisSurvey, setAmountEarnedForThisSurvey] = useState(0);

  const [allAnswersOfSurvey, setAllAnswersOfSurvey] = useState<Answer[]>([]);

  const [allQuestionsOfSurvey, setAllQuestionsOfSurvey] = useState<Question[]>(
    []
  );

  const router = useRouter();
  const { id } = router.query;

  const surveyId: number = Number(id);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const getAllAnswersGivenByParticipant = async () => {
      const answersOfParticpant: Answer[] = [];

      const allAnswers = await getAnswersOfSurvey(address, {
        _surveyId: surveyId,
      });

      for (let answerId = 0; answerId < allAnswers.length; answerId++) {
        const answer = allAnswers[answerId];

        if (
          answer.surveyId === surveyId &&
          answer.participantWalletAddress === address
        ) {
          answersOfParticpant.push(answer);
        }
      }

      setAllAnswersOfSurvey(answersOfParticpant);
    };

    getAllAnswersGivenByParticipant();
  }, []);

  useEffect(() => {
    const fetchAllEarningsMadeByParticipant = async () => {
      const fetchedEarnings = await getAllEarningsMadeByParticipant(address, {
        _walletAddress: address as `0x${string}`,
      });
      setAllEarningsMadeByParticipant(fetchedEarnings);
    };

    const getAllSurveysFn = async () => {
      const fetchedSurveys = await getAllSurveys(address);
      setAllSurveys(fetchedSurveys);
    };

    const fetchQuestionsOfSurvey = async () => {
      const fetchedQuestions = await getQuestionsOfSurvey(address, {
        _surveyId: surveyId,
      });

      setAllQuestionsOfSurvey(fetchedQuestions);
    };

    const getAmountEarnedByUserForSurvey = async () => {
      let amount: number = 0;

      for (
        let earningId = 0;
        earningId < allEarningsMadeByParticipant.length;
        earningId++
      ) {
        const earning = allEarningsMadeByParticipant[earningId];

        if (earning.surveyId === surveyId) {
          amount += earning.amountPaidOutInWei;
        }
      }

      setAmountEarnedForThisSurvey(amount);
    };

    fetchQuestionsOfSurvey();
    getAllSurveysFn();
    fetchAllEarningsMadeByParticipant();
    getAmountEarnedByUserForSurvey();
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
      <Text fontSize={"14"} onClick={() => router.back()}>
        Back
      </Text>

      <div className="flex flex-row justify-between w-full my-2">
        <Text fontWeight={"bold"} fontSize={"20"}>
          Survey {1}
        </Text>
      </div>

      <div className="flex flex-row justify-between w-full mt-2 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Amount Earned
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
          {parseAmountInWeiToEther(amountEarnedForThisSurvey)} cUSD
        </Button>
      </div>

      <Divider className="mt-3" />

      <div className="flex flex-row justify-between w-full my-2"></div>

      <Text fontWeight={"bold"} fontSize={"18"}>
        Your Answers
      </Text>

      {allQuestionsOfSurvey.map((question) => (
        <div key={question.id}>
          <div className="flex flex-col justify-between w-full my-4">
            <div className="flex flex-row ">
              <Text fontWeight={"n"} fontSize={"14px"} mb={2}>
                Question {allQuestionsOfSurvey.indexOf(question) + 1}
              </Text>
            </div>

            <div className="flex flex-row justify-between items-center">
              <Text fontWeight={"bold"} fontSize={"14px"}>
                {question.sentence}
              </Text>
              <Button
                onClick={() => router.push("/participant/view-taken-surveys/1")}
                // marginTop={"4"}
                disabled={true}
                borderRadius={"10"}
                width={"1/6"}
                bgColor={"#C0D6E8"}
                textColor={"black"}
                fontWeight={"bold"}
                fontSize={"14px"}
              >
                {allAnswersOfSurvey
                  .at(allQuestionsOfSurvey.indexOf(question))
                  ?.value.toString()}
              </Button>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
}
