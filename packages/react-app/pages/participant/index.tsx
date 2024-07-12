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
import router from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Participant } from "@/entities/Participant";
import { getParticipantByWalletAddress } from "@/services/getParticipantByWalletAddress";
import { Earning } from "@/entities/Earning";
import { getAllEarningsMadeByParticipant } from "@/services/getAllEarningsMadeByParticipant";
import { Survey } from "@/entities/Survey";
import { getAllSurveys } from "@/services/getAllSurveys";

export default function ParticipantHome() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [participant, setParticipant] = useState<Participant | null>(null);

  const [allEarningsMadeByParticipant, setAllEarningsMadeByParticipant] =
    useState<Earning[]>([]);

  const [allSurveys, setAllSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchParticipantByWalletAddress = async () => {
      const fetchedParticipant = await getParticipantByWalletAddress(address, {
        _walletAddress: address as `0x${string}`,
      });

      setParticipant(fetchedParticipant);
    };

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

    getAllSurveysFn();
    fetchParticipantByWalletAddress();

    fetchAllEarningsMadeByParticipant();
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
      <Text fontSize={"14"}>Welcome!</Text>

      <div className="flex flex-row justify-between w-full my-4 ">
        <Text fontWeight={"bold"} fontSize={"20"}>
          Participant {participant?.id}
        </Text>
      </div>

      <div className="flex flex-row justify-between items-center w-full mt-2 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Surveys Taken
        </Text>

        <Button
          onClick={() => router.push("/participant/view-taken-surveys")}
          // marginTop={"4"}
          borderRadius={"10"}
          width={"1/6"}
          bgColor={"#F5E8C7"}
          textColor={"black"}
          fontWeight={"bold"}
          fontSize={"14px"}
        >
          {allEarningsMadeByParticipant.length}
        </Button>
      </div>

      <div className="flex flex-row justify-between w-full mt-6 mb-3 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Available surveys
        </Text>
      </div>
      <Divider />

      {allSurveys.map((survey) => (
        <div key={survey.id}>
          <div className="flex flex-row justify-between w-full my-4">
            <Avatar
              name={`S ${survey.id}`}
              color={"black"}
              bgColor={"#F5E8C7"}
            />

            <div className="flex flex-col absolute left-10 ml-6">
              <Text fontWeight={"n"} fontSize={"14px"}>
                Topic:
              </Text>
              <Text fontWeight={"n"} fontSize={"18"}>
                {survey.topic}
              </Text>
            </div>

            <Button
              onClick={() => router.push(`/participant/view-survey/${survey.id}`)}
              // marginTop={"4"}
              borderRadius={"10"}
              width={"1/6"}
              bgColor={"#363062"}
              textColor={"white"}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              {survey.numberOfQuestions} Qs
            </Button>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
}
