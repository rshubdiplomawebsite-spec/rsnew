"use client";

import { AppProvider } from "../context/AppContext";

export const Provider = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};
