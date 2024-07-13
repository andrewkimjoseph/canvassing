import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Button, Image, Spinner, Text } from "@chakra-ui/react";
import { checkIfParticipantExists } from "@/services/checkIfParticipantExists";
import { checkIfResearcherExists } from "@/services/checkIfResearcherExists";
import router from "next/router";
export default function ParticipantBecomeOneSuccess() {
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
    return (
      <div className="flex flex-col justify-center h-screen items-center mb-24">
      <Spinner/>
    </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-2 mx-4 h-svh relative text-center ">
      <Text fontWeight={"bold"} fontSize={"28"} mt={8}>
        Account Creation Successful!
      </Text>
      <Image
        // paddingY={8}
        // si={"300px"}
        my={4}
        height={"200px"}
        width={"200px"}
        src="/successParticipant.png"
        alt="Home image"
      />
      <Text fontSize={"20"}>
        Connect with data insight companies to drive user-centric brand and
        business growth
      </Text>

      <div className=" absolute bottom-0 mb-24 w-full">
        <Button
          onClick={() => router.push("/participant")}
          marginTop={"4"}
          borderRadius={"10"}
          width={"full"}
          bgColor={"#363062"}
          textColor={"white"}
          fontSize={"16px"}
        >
          Start answering
        </Button>
      </div>
    </div>
  );
}
