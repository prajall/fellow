"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

const client = new QueryClient();

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(client);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
