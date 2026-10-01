import HeaderComponent from "@/components/Header";
import SidebarComponent from "@/components/Sidebar";
import { PropsWithChildren } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <HeaderComponent />
      <SidebarComponent />
      {children}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!}/>
    </>
  );
};

export default AppLayout;
