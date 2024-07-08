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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CanvassingLogo } from "./logo";
import NavLink from "./navLink";

import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
const Links = [
  {
    "title": "Onboarding",
    "href": "/"
  },
  {
    "title": "Participant Home",
    "href": "/participant"
  },
  {
    "title": "Researcher Home",
    "href": "/researcher"
  },
  // {
  //   "title": "Approve Us",
  //   "href": "/approve-us"
  // },
];


export default function CanvassingNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { connect } = useConnect();

  const [isMiniPay, setIsMiniPay] = useState(false);

  useEffect(() => {
    if (
      window.ethereum &&
      (window.ethereum.isMiniPay || window.ethereum.isMinipay)
    ) {
      setIsMiniPay(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, []);

  return (
    <>
      <Box
        bg={useColorModeValue("#C0D6E8", "#C0D6E8")}
        px={2}
        position="sticky"
        top="0"
        zIndex="1000"
      >
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
          <HStack spacing={8} alignItems={"center"}>
            {/* <Box>Stekcit BwC</Box> */}
            <CanvassingLogo />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink href={link.href} key={link.href}>{link.title}</NavLink>
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
              <div style={{ visibility: "hidden", pointerEvents: "none" }}>
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
              </div>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }} className="flex flex-col ">
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink href={link.href} key={link.href}>{link.title}</NavLink>
              ))}
            </Stack>
            
          </Box>
        ) : null}
        
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
