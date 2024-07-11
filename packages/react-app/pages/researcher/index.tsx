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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spinner,
  Square,
  Text,
  useToast,
} from "@chakra-ui/react";
import { checkIfParticipantExists } from "@/services/checkIfParticipantExists";
import { checkIfResearcherExists } from "@/services/checkIfResearcherExists";
import router from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Survey } from "@/entities/Survey";
import { getSurveysCreatedByResearcher } from "@/services/getSurveysCreatedByResearcher";
import { Researcher } from "@/entities/Researcher";
import { getResearcherByWalletAddress } from "@/services/getResearcherByWalletAddress";
import { verifyResearcher } from "@/services/verifyResearcher";
import React from "react";
import { fonts } from "@/fonts/fonts";
import { payForVerification } from "@/services/payForVerification";
import { getTotalAmountFundedByResearcherInWei } from "@/services/getTotalAmountFundedByResearcherInWei";
export default function ResearcherHome() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const initRef = React.useRef(null);
  const [participantExists, setParticipantExists] = useState(false);
  const [totalAmountFundedByResearcherInWei, setTotalAmountFundedByResearcherInWei] = useState(0);
  const [allSurveysCreatedByResearcher, setAllSurveysCreatedByResearcher] =
    useState<Survey[]>([]);


    const [researcherExists, setResearcherExists] = useState(false);
  const toast = useToast();
  const [researcher, setResearcher] = useState<Researcher | null>(null);
  const [isVerifyingResearcher, setIsVerifyingResearcher] = useState(false);

  const onClickGetVerified = async () => {
    setIsVerifyingResearcher(true);

    const verificationPaymentIsMade = await payForVerification(address);

    if (verificationPaymentIsMade) {
      const researcherIsVerified = await verifyResearcher(address, {
        _walletAddress: address as `0x${string}`,
      });

      if (researcherIsVerified) {
        // await router.replace("/researcher/become-one/success");
        toast({
          description: "Verified successfully.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          description: "Verification failed.",
          status: "error",
          duration: 4000,
          isClosable: false,
        });
      }
    } else {
      toast({
        description: "Verification failed.",
        status: "error",
        duration: 4000,
        isClosable: false,
      });
    }

    setIsVerifyingResearcher(false);
  };

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

    const fetchResearcherByWalletAddress = async () => {
      const fetchedResearcher = await getResearcherByWalletAddress(address, {
        _walletAddress: address as `0x${string}`,
      });

      setResearcher(fetchedResearcher);
    };

    const getAllSurveysCreatedByResearcher = async () => {
      const fetchedSurveysCreatedByResearcher =
        await getSurveysCreatedByResearcher(address, {
          _researcherWalletAddress: address,
        });
      setAllSurveysCreatedByResearcher(fetchedSurveysCreatedByResearcher);
    };


    const getTotalAmountFundedByResearcherInWeiFn = async () => {
      const fetchedTotalAmountFundedByResearcherInWei =
        await getTotalAmountFundedByResearcherInWei(address, {
          _creatingResearcherWalletAddress: address as `0x${string}`,
        });
        setTotalAmountFundedByResearcherInWei(fetchedTotalAmountFundedByResearcherInWei);
    };

    fetchResearcherByWalletAddress();
    getAllSurveysCreatedByResearcher();
    checkIfParticipantExistsAndSet();
    checkIfResearcherExistsAndSet();

    getTotalAmountFundedByResearcherInWeiFn();
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
    <div className="flex flex-col items-left py-2 mx-4 h-svh relative">
      <Text fontSize={"14"}>Welcome!</Text>

      <div className="flex flex-row justify-between w-full my-4 ">
        <div className="flex flex-row w-full ">
          <Text fontWeight={"bold"} fontSize={"20"}>
            Researcher {researcher?.id}
          </Text>

          {researcher?.isVerified && (
            <Square size="25px" color="white" ml={2} mt={1}>
              <Image my={4} src="/checkmark.png" alt="Home image" />
            </Square>
          )}
        </div>

        {!researcher?.isVerified && (
          <Popover
            closeOnBlur={false}
            // placement="d"
            initialFocusRef={initRef}
          >
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  <Button
                    isLoading={isVerifyingResearcher}
                    loadingText={"Verifying"}
                    borderRadius={"10"}
                    bgColor={"#363062"}
                    textColor={"white"}
                    fontWeight={"normal"}
                    fontSize={"14px"}
                    _hover={{
                      bgColor: "#363062",
                      textColor: "white",
                    }}
                  >
                    <Text fontWeight={"n"} fontSize={"14"}>
                      Get verified
                    </Text>
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent
                    color="#363062"
                    bg="#c0d6e8"
                    className={fonts.sen.className}
                  >
                    <PopoverArrow bg="#c0d6e8" />
                    <PopoverCloseButton bg="#363062" color={"white"} />
                    <PopoverHeader>Get Checked!</PopoverHeader>
                    <PopoverBody>
                      <Button
                        // onClick={() => router.push("/researcher")}
                        // marginTop={"4"}

                        onClick={() => {
                          onClose();
                          onClickGetVerified();
                        }}
                        borderRadius={"10"}
                        // width={"1/6"}
                        bgColor={"#363062"}
                        textColor={"white"}
                        fontWeight={"normal"}
                        fontSize={"12px"}
                        _hover={{
                          bgColor: "#363062",
                          textColor: "white",
                        }}
                      >
                        Get
                        <Square size="25px" color="white" mx={1}>
                          <Image my={4} src="/checkmark.png" alt="Home image" />
                        </Square>{" "}
                        for 1 cUSD
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>
        )}
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
          {allSurveysCreatedByResearcher.length}
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
          {totalAmountFundedByResearcherInWei} cUSD
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

      {allSurveysCreatedByResearcher.length === 0 && (
        <Box>
          <Text pt="2" fontStyle={"italic"}>
            ... will show here
          </Text>
        </Box>
      )}

      {allSurveysCreatedByResearcher.map((survey) => (
        <>
          <div
            className="flex flex-row justify-between w-full my-4"
            key={survey.id}
          >
            <Avatar
              name={`S${survey.id}`}
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
              onClick={() => router.push("/researcher/created-surveys/1")}
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
            <Divider />
          </div>
        </>
      ))}
    </div>
  );
}
