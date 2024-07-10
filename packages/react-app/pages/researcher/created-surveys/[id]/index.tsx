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
  Square,
  Text,
} from "@chakra-ui/react";
import { checkIfParticipantExists } from "@/services/checkIfParticipantExists";
import { checkIfResearcherExists } from "@/services/checkIfResearcherExists";
import router from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";
export default function ResearcherParticularCreatedSurveyView() {
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


      <div className="flex flex-row justify-between w-full my-2 ">
        <div className="flex flex-row w-full ">
          <Text fontWeight={"normal"} fontSize={"24"}>
            Survey {1}
          </Text>
          {/* <Square size="25px" color="white" ml={2} mt={1}>
            <Image my={4} src="/checkmark.png" alt="Home image" />
          </Square> */}
        </div>
      </div>

      <Divider />

      <Text fontWeight={"bold"} fontSize={"20"} my={3}>
        Participant Distribution
      </Text>

      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Gender
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Country
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Age
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>



      <Text fontWeight={"bold"} fontSize={"20"} my={3}>
        Survey Feedback
      </Text>

      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Question 1
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Question 2
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
