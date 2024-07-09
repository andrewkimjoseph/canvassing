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
export default function ResearcherHome() {
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

  
      <Text fontSize={"14"}>Welcome!</Text>

      <div className="flex flex-row justify-between w-full my-4 ">
        <div className="flex flex-row w-full ">
          <Text fontWeight={"bold"} fontSize={"20"}>
            Researcher {1}
          </Text>
          <Square size="25px" color="white" ml={2} mt={1}>
            <Image my={4} src="/checkmark.png" alt="Home image" />
          </Square>
        </div>

        <Button
          // onClick={() => router.push("/researcher")}
          // marginTop={"4"}
          borderRadius={"10"}
          width={"1/6"}
          bgColor={"#363062"}
          textColor={"white"}
          fontWeight={"normal"}
          fontSize={"12px"}
        >
          Get verified
        </Button>
      </div>

      <div className="flex flex-row justify-between w-full mt-2 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Surveys Created
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
          4
        </Button>
      </div>

      <div className="flex flex-row justify-between w-full mt-4 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Amount Funded
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
          20 cUSD
        </Button>
      </div>

      <div className="flex flex-row justify-between w-full mt-2 ">
        <Button
          onClick={() => router.push("/researcher/create-survey")}
          marginTop={"4"}
          borderRadius={"10"}
          width={"full"}
          bgColor={"#363062"}
          textColor={"white"}
          fontSize={"16px"}
          rightIcon={<ArrowForwardIcon color="#F5E9C7"></ArrowForwardIcon>}
        >
          Create new survey
        </Button>
      </div>



      <div className="flex flex-row justify-between w-full mt-6 mb-3 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Surveys Created
        </Text>
      </div>

      <Divider />



      {surveys.map((survey) => (
        <>
          <div className="flex flex-row justify-between w-full my-4">
            <Avatar name="Dan Abrahmov" color={"black"} bgColor={"#F5E8C7"} />

            <div className="flex flex-col absolute left-10 ml-6">
              <Text fontWeight={"n"} fontSize={"14px"}>
                Topic:
              </Text>
              <Text fontWeight={"n"} fontSize={"18"}>
                {survey.topic}
              </Text>
            </div>

            <Button
              onClick={() => router.push("/researcher")}
              // marginTop={"4"}
              borderRadius={"10"}
              width={"1/6"}
              bgColor={"#F5E8C7"}
              textColor={"black"}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              {survey.numberOfQuestions} Qs
            </Button>
          </div>
          <Divider />
        </>
      ))}
    </div>
  );
}
