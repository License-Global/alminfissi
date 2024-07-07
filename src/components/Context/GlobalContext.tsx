'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type GlobalContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalContext = createContext<GlobalContextType | any>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {





  return (
    <GlobalContext.Provider value={""}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
