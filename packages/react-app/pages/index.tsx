import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Button, Image, Text } from "@chakra-ui/react";
export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setIsMounted(true);
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
    <div className="flex flex-col justify-center items-center py-2 h-full">
      <Image
        // paddingY={8}
        height={"300px"}
        src="/home.png"
        alt="Home image"
      />
      <Text fontWeight={"bold"} fontSize={"18"}>
        Welcome to Canvassing!
      </Text>
      <Text fontSize={"14"}>opinions pay, today</Text>

      <Text fontSize={"18"} marginTop={10} marginBottom={4}>
        Continue as ...
      </Text>

      <Button
        //   onClick={() => router.push("/")}

        width={"95%"}
        borderRadius={"10"}
        bgColor={"#F5E8C7"}
        textColor={"black"}
      >
        Participant
      </Button>

      <Button
        //   onClick={() => router.push("/")}

        marginTop={"4"}
        borderRadius={"10"}
        width={"95%"}
        bgColor={"#363062"}
        textColor={"white"}
      >
        Researcher
      </Button>
    </div>
  );
}
