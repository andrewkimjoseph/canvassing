import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Button, Image, Text } from "@chakra-ui/react";
import { checkIfParticipantExists } from "@/services/checkIfParticipantExists";
import { checkIfResearcherExists } from "@/services/checkIfResearcherExists";
import router from "next/router";
export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [participantExists, setParticipantExists] = useState(false);
  const [researcherExists, setResearcherExists] = useState(false);

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
    <div className="flex flex-col items-center py-2 mx-4 h-svh relative">
      <Image
        // paddingY={8}
        // si={"300px"}
        height={"250px"}
        width={"250px"}
        src="/home.png"
        alt="Home image"
      />
      <Text fontWeight={"bold"} fontSize={"24"} mt={12}>
        Welcome to Canvassing!
      </Text>
      <Text fontSize={"16"}>opinions pay, today</Text>

      <div className=" absolute bottom-0 mb-24 text-center w-full" >
        <Text fontSize={"20"} marginTop={10} marginBottom={2}>
          Continue as ...
        </Text>

        <Button
          onClick={() =>
            router.push(
              participantExists
                ? "/participant"
                : "/participant/account-creation"
            )
          }
          width={"full"}
          borderRadius={"10"}
          bgColor={"#F5E8C7"}
          textColor={"black"}
          fontSize={"16px"}
          
        >
          Participant
        </Button>

        <Button
          onClick={() =>
            router.push(
              researcherExists ? "/researcher" : "/researcher/account-creation"
            )
          }
          marginTop={"4"}
          borderRadius={"10"}
          width={"full"}
          bgColor={"#363062"}
          textColor={"white"}
          fontSize={"16px"}
        >
          Researcher
        </Button>
      </div>
    </div>
  );
}
