import HeaderComponent from "@/components/Header";
import SidebarComponent from "@/components/Sidebar";
import { PropsWithChildren } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { TooltipProvider } from "@/components/ui/tooltip";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <HeaderComponent />
      <SidebarComponent />
      <TooltipProvider>{children}</TooltipProvider>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </>
  );
};

export default AppLayout;
