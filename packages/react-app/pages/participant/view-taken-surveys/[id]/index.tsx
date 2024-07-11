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
  Square,
  Text,
} from "@chakra-ui/react";
import { checkIfParticipantExists } from "@/services/checkIfParticipantExists";
import { checkIfResearcherExists } from "@/services/checkIfResearcherExists";
import router from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function ParticipantParticularTakenSurvey() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [participantExists, setParticipantExists] = useState(false);
  const [researcherExists, setResearcherExists] = useState(false);

  const surveys = [
    {
      id: 0,
      topic: "Minipay UX",
      numberOfQuestions: 2,
    },
    {
      id: 1,
      topic: "Minipay UX",
      numberOfQuestions: 2,
    },
    {
      id: 2,
      topic: "Minipay UX",
      numberOfQuestions: 2,
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkIfParticipantExistsAndSet = async () => {
      if (address) {
        const doesParticipantExist = await checkIfParticipantExists(address);
        setParticipantExists(doesParticipantExist);
      }
    };

    const checkIfResearcherExistsAndSet = async () => {
      if (address) {
        const doesResearcherExist = await checkIfResearcherExists(address);
        setResearcherExists(doesResearcherExist);
      }
    };

    checkIfParticipantExistsAndSet();
    checkIfResearcherExistsAndSet();
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
          4 cUSD
        </Button>
      </div>

      <Divider className="mt-3" />


      <div className="flex flex-row justify-between w-full my-2"></div>



      <Text fontWeight={"bold"} fontSize={"18"}>
          Your Answers
        </Text>

      {surveys.map((survey) => (
        <>
          <div className="flex flex-col justify-between w-full my-4">


            <div className="flex flex-row ">
              <Text fontWeight={"n"} fontSize={"14px"} mb={2}>
                Question 1
              </Text>
    
            </div>


            <div className="flex flex-row justify-between items-center">
              <Text fontWeight={"bold"} fontSize={"14px"}>
                Lorem ipsum todor ... ?
              </Text>
              <Button
              onClick={() => router.push("/participant/view-taken-surveys/1")}
              // marginTop={"4"}
              disabled={true}
              borderRadius={"10"}
              width={"1/6"}
              bgColor={"#F5E8C7"}
              textColor={"black"}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              Yes
            </Button>
            </div>


        
          </div>
          <Divider />
        </>
      ))}
    </div>
  );
}
