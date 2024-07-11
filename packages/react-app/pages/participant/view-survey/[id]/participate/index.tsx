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
  Radio,
  RadioGroup,
  Square,
  Stack,
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
          Taking Survey {2}
        </Text>
      </div>

      {/* <div className="flex flex-row justify-between w-full mt-2 ">
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
      </div> */}

      <Divider className="mt-1" />

      <Text fontWeight={"bold"} fontSize={"18"} my={2}>
        Questions
      </Text>

      {surveys.map((survey) => (
        <>
          <div className="flex flex-row justify-between w-full mb-4 mt-2">
            <div className="flex flex-col left-10 ">
              <Text fontSize={"14px"}>Question 1:</Text>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full mb-2">
            <Text fontWeight={"n"} fontStyle={"italic"} fontSize={"16px"}>
              Lorem ipsum dolor sit amet
            </Text>
          </div>

          <div className="flex flex-row justify-between w-full my-2">
            {/* <Avatar name="Dan Abrahmov" color={"black"} bgColor={"#F5E8C7"} /> */}

            <RadioGroup>
              <Stack direction="row">
                <Radio value={"true"} colorScheme={"blue"}>
                  <Text fontWeight={"n"} fontSize={"14px"}>
                    True
                  </Text>
                </Radio>
                <Radio value={"false"}>
                  <Text fontWeight={"n"} fontSize={"14px"}>
                    False
                  </Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </div>

          <Divider />
        </>
      ))}

      <Button
        // onClick={createResearcherAccount}

        onClick={() => router.push("/researcher/become-one/success")}
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
        Complete
      </Button>
    </div>
  );
}
