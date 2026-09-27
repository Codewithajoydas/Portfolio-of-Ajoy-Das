import HeaderComponent from "@/components/Header";
import SidebarComponent from "@/components/Sidebar";
import { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <HeaderComponent />
      <SidebarComponent />
      {children}
    </>
  );
};

export default AppLayout;
