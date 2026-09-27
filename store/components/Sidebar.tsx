"use client";
import { SidebarContextType } from "@/types/components/SidebarContext.type";
import { createContext, PropsWithChildren, useState } from "react";

export const SidebarContext = createContext<SidebarContextType>({
  sidebarOpen: false,
  toggleSidebar: () => {},
  setSidebarOpen: () => {},
});

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);
  return (
    <SidebarContext.Provider
      value={{ sidebarOpen, toggleSidebar, setSidebarOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
