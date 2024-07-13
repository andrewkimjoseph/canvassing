import { FC, ReactNode } from "react";
import CanvassingNavbar from "./navbar";

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <CanvassingNavbar />
      {children}
    </>
  );
};

export default Layout;
