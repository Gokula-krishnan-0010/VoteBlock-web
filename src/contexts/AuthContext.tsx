"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Voter } from "@/lib/types";
import { mockVoters } from "@/lib/mock-data";

interface AuthContextType {
  user: Voter | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  verifyOtp: (otp: string) => boolean;
  logout: () => void;
  isOtpVerified: boolean;
  pendingUser: Voter | null;
  updateProfile: (updates: Partial<Voter>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Voter | null>(null);
  const [pendingUser, setPendingUser] = useState<Voter | null>(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const login = (email: string, _password: string): boolean => {
    const found = mockVoters.find((v) => v.email === email);
    if (found) {
      setPendingUser(found);
      setIsOtpVerified(false);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, _password: string): boolean => {
    const exists = mockVoters.find((v) => v.email === email);
    if (exists) return false;
    const newVoter: Voter = {
      id: `v${Date.now()}`,
      name,
      email,
      age: 0,
      gender: "Other",
      eligible: true,
      wardNo: "",
      address: "",
      jurisdiction: "",
      role: "voter",
    };
    mockVoters.push(newVoter);
    setPendingUser(newVoter);
    setIsOtpVerified(false);
    return true;
  };

  const verifyOtp = (otp: string): boolean => {
    if (otp === "123456" && pendingUser) {
      setUser(pendingUser);
      setPendingUser(null);
      setIsOtpVerified(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setPendingUser(null);
    setIsOtpVerified(false);
  };

  const updateProfile = (updates: Partial<Voter>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      const idx = mockVoters.findIndex((v) => v.id === user.id);
      if (idx >= 0) mockVoters[idx] = updated;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        verifyOtp,
        logout,
        isOtpVerified,
        pendingUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
