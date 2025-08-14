"use client";
import { GroupSidebar } from "@/src/components/GroupSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-screen bg-background">
          <div className="w-96 border-r border-border bg-card">
            <GroupSidebar />
          </div>

          {children}
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default AppLayout;
