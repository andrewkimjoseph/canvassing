import { ReactNode } from "react";
import { Link } from "@chakra-ui/react";
interface NavLinkProps {
  children: ReactNode;
  href: string;
}

const NavLink = ({ children, href }: NavLinkProps) => (
  <Link
    px={4}
    py={2}
    rounded={"md"}
    textColor={"black"}
    fontSize={"16px"}
    fontWeight={"bold"}
    _hover={{
      textColor: "black",
      textDecoration: "none",
      bg: "#F5E8C7",
    }}
    href={href}
  >
    {children}
  </Link>
);

export default NavLink;
