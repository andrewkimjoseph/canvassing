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
  Square,
  Text,
} from "@chakra-ui/react";
import { checkIfParticipantExists } from "@/services/checkIfParticipantExists";
import { checkIfResearcherExists } from "@/services/checkIfResearcherExists";
import router from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function ParticipantParticularSurvey() {
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

      <div className="flex flex-row w-full my-2">
        <Text fontWeight={"bold"} fontSize={"20"}>
          Survey {2}
        </Text>

        <Popover>
          <PopoverTrigger>
            <Square size="25px" color="white" ml={2} mt={1}>
              <Image my={4} src="/checkmark.png" alt="Home image" />
            </Square>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            {/* <PopoverCloseButton /> */}
            {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
            <PopoverBody>Reseacher of this survey is verified</PopoverBody>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-row justify-between w-full mt-2 ">
        <Text fontWeight={"n"} fontSize={"18"}>
          Total Questions
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
          3
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
          4 cUSD
        </Button>
      </div>

      <Divider className="mt-3" />

      <Text fontWeight={"bold"} fontSize={"18"} my={3}>
        Questions
      </Text>

      <Accordion allowToggle>
        {surveys.map((survey) => (
          <>
            <AccordionItem>
              <AccordionButton>
                <div className="flex flex-row justify-between w-full">
                  <Box as="span" textAlign="left">
                    Question 1
                  </Box>
                  <AccordionIcon />
                </div>
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text fontWeight={"n"} fontStyle={"italic"} fontSize={"16px"}>
                  Lorem ipsum dolor sit amet
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <Divider />
          </>
        ))}
      </Accordion>

      <Button
        // onClick={createResearcherAccount}

        onClick={() => router.push("/participant/view-survey/1/participate")}
        // isLoading={creatingResearcher}
        mb={24}
        bottom={0}
        position={"absolute"}
        // marginTop={"4"}
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
        Participate
      </Button>
    </div>
  );
}
