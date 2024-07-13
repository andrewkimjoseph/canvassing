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
import { Earning } from "@/entities/Earning";
import { Survey } from "@/entities/Survey";
import { getParticipantByWalletAddress } from "@/services/getParticipantByWalletAddress";
import { getAllEarningsMadeByParticipant } from "@/services/getAllEarningsMadeByParticipant";
import { getAllSurveys } from "@/services/getAllSurveys";
import { parseAmountInWeiToEther } from "@/services/parseWeiAmount";
import { getSurveyById } from "@/services/getSurveyById";

export default function ParticipantTakenSurveys() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [participant, setParticipant] = useState<Participant | null>(null);

  const [allEarningsMadeByParticipant, setAllEarningsMadeByParticipant] =
    useState<Earning[]>([]);

  const [allSurveys, setAllSurveys] = useState<Survey[]>([]);

  const [allSurveysTakenByParticipant, setAllSurveysTakenByParticipant] =
    useState<Survey[]>([]);

  useEffect(() => {
    const getAllSurveysTakenByParticipant = async () => {
      const fetchedSurveys: Survey[] = [];

      const allEarnings = await getAllEarningsMadeByParticipant(address, {
        _walletAddress: address as `0x${string}`
      })
      for (let earningId = 0; earningId < allSurveys.length; earningId++) {
        const earning = allEarnings[earningId];

        fetchedSurveys.push(
          (await getSurveyById(address, {
            _surveyId: earning.surveyId,
          })) as Survey
        );
      }

      setAllSurveysTakenByParticipant(fetchedSurveys);
    };

    getAllSurveysTakenByParticipant();
  }, [allSurveys, allEarningsMadeByParticipant]);
  
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
  }, [allEarningsMadeByParticipant, allSurveys]);

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
          Surveys Taken
        </Text>
      </div>

      <div className="flex flex-row justify-between w-full mt-2 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Total Taken
        </Text>

        <Button
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

      <div className="flex flex-row justify-between w-full mt-2 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Total Earnings
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
          {parseAmountInWeiToEther(
            allEarningsMadeByParticipant.reduce(
              (runningTotal, currentEarning) =>
                runningTotal + currentEarning.amountPaidOutInWei,
              0
            )
          )}{" "}
          cUSD
        </Button>
      </div>

      <div className="flex flex-row justify-between w-full mb-3 "></div>

      <Divider />

      {allSurveysTakenByParticipant.length === 0 && (
        <Box>
          <Text pt="2" fontStyle={"italic"}>
            ... will show here
          </Text>
        </Box>
      )}

      {allSurveysTakenByParticipant.map((survey) => (
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
              onClick={() =>
                router.push(`/participant/view-taken-surveys/${survey.id}`)
              }
              // marginTop={"4"}
              borderRadius={"10"}
              width={"1/6"}
              bgColor={"#F5E8C7"}
              textColor={"black"}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              View
            </Button>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
}
