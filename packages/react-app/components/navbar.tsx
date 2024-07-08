"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Fade,
  ScaleFade,
  Slide,
  Collapse,
  Circle,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CanvassingLogo } from "./logo";
import NavLink from "./navLink";

import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import LogoLink from "./logoLink";
import { checkIfParticipantExists } from "@/services/checkIfParticipantExists";
import { checkIfResearcherExists } from "@/services/checkIfResearcherExists";


export default function CanvassingNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  const [participantExists, setParticipantExists] = useState(false);
  const [researcherExists, setResearcherExists] = useState(false);

  const { connect } = useConnect();

  const [isMiniPay, setIsMiniPay] = useState(false);

  const Links = [
    {
      title: "Onboarding",
      href: "/",
    },
    {
      title: "Participant View",
      href: participantExists ? "/participant" : "/participant/account-creation",
    },
    {
      title: "Researcher View",
      href: researcherExists ? "/researcher" : "/researcher/become-one",
    },
  ];

  useEffect(() => {
    if (
      window.ethereum &&
      (window.ethereum.isMiniPay || window.ethereum.isMinipay)
    ) {
      setIsMiniPay(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

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

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Box bg="#C0D6E8" px={4} position="sticky" top="0" zIndex="1000">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            border={"1px solid black"}
            bgColor={"#F5E8C7"}
            color={"black"}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon color={"black"} />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={4} alignItems={"center"}>
            {/* <Box>Stekcit BwC</Box> */}

            <LogoLink href="/">
              <CanvassingLogo />
            </LogoLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink href={link.href} key={link.href}>
                  {link.title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {/* <IconButton
              _hover={{
                bgColor: "#FFD62C",
              }}
              color={"white"}
              bgColor={"white"}
              size={"md"}
              icon={
                colorMode === "light" ? (
                  <MoonIcon color={"black"} />
                ) : (
                  <SunIcon color={"black"} />
                )
              }
              aria-label={"Change Color Mode"}
              // display={{ md: "none" }}
              onClick={toggleColorMode}
              marginRight={4}
            /> */}

            {!isMiniPay ? (
              <ConnectButton
                chainStatus="none"
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "avatar",
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
                label="Connect"
              />
            ) : (
              <Circle
                size="10px"
                bg={`${isConnected ? "green" : "tomato"}`}
                color="white"
              >
                {/* <PhoneIcon /> */}
              </Circle>
            )}
          </Flex>
        </Flex>
      </Box>

      {isOpen ? (
        <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
          <Box
            mt={16}
            pb={2}
            display={{ md: "none" }}
            className="flex flex-col w-full h-screen"
            bg="#C0D6E8"
            px={2}
            py={4}
            // borderTopRadius={20}
            zIndex={0}
          >
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink href={link.href} key={link.href}>
                  {link.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        </Slide>
      ) : // <Collapse in={isOpen} animateOpacity>

      // </Collapse>
      // <Fade in={isOpen}>

      null}
      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
