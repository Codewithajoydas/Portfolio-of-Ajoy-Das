'use client'
import { AuthContext } from "@/store/auth/auth.context";
import { useContext } from "react";

export const useAuth = () => {
  const { user, isLoading, isAuthenticated } = useContext(AuthContext) || {};
  return { user, isLoading, isAuthenticated };
};
