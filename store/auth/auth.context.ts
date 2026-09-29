'use client';
import {
  createContext,
  createElement,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

interface AuthContextProps<T> {
  user: T | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps<User> | undefined>(
  undefined,
);

const fetchUserDetails = async () => {
  try {
    const res = await fetch("/api/auth/me");
    if (!res.ok) throw new Error("Failed to fetch user details");
    const data = await res.json();
    return data.user;
  } catch (error) {
    throw new Error(`Failed to fetch user details ${error}`);
  }
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const user = await fetchUserDetails();
      setUser(user);
      setIsAuthenticated(true);
      setLoading(false);
    };
    getUser();
  }, []);

  return createElement(
    AuthContext.Provider,
    { value: { user, isLoading: loading, isAuthenticated } },
    children,
  );
};
