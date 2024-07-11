import { Link } from "@chakra-ui/react";


import { ReactNode } from "react";

interface LogoLinkProps {
    children: ReactNode;
    href: string;
  }
  

const LogoLink = ({ children, href }: LogoLinkProps) => (
    <Link
      // px={2}
      // py={1}
      // rounded={"md"}
      // textColor={"black"}
      // fontSize={"16px"}
      // fontWeight={"bold"}
      // _hover={{
      //   textColor: "black",
      //   textDecoration: "none",
      //   bg: "white",
      // }}
      href={href}
    >
      {children}
    </Link>
  );
  
  export default LogoLink;