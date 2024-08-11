"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import NotAllowed from "@/components/NotAllowed";
import { ThemeProvider } from "@/providers/theme-provider";

import { createContext, useContext } from "react";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

import isAdminStore from "@/providers/store/isAdminState";
import loadingStore from "@/providers/store/loadingState";

// Create a context for the admin status
const AdminContext = createContext<boolean | null>(null);

export function useAdmin() {
  return useContext(AdminContext);
}

export default function DashboardClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminCheck>{children}</AdminCheck>;
}

function AdminCheck({ children }: { children: React.ReactNode }) {
  const { isAdmin, updateIsAdmin, apiRequestMade, setApiRequestMade } = isAdminStore();
  const { loading, updateLoading } = loadingStore();
  const { user } = useUser();

  // useEffect(() => {
  //   const checkAdminStatus = async () => {
  //     if (user?.emailAddresses[0]?.emailAddress && isAdmin === null && !apiRequestMade) {
  //       updateLoading(true);
  //       setApiRequestMade(true);
  //       try {
  //         const response = await axios.post("/api/", {
  //           email: user.emailAddresses[0].emailAddress,
  //         });
  //         updateIsAdmin(response.data.exists);
  //         updateLoading(false);

  //       } catch (error) {
  //         console.error("Error checking admin status:", error);
  //         updateIsAdmin(false);
  //       } 
  //     } else if (!user) {
  //       updateLoading(false);
  //     }
  //   };

  //   checkAdminStatus();
  // }, [user, isAdmin, updateIsAdmin, updateLoading, apiRequestMade, setApiRequestMade]);

  if (loading && isAdmin === null) {
    return (
      <div className='bg-[#18181b] h-screen w-full flex justify-center items-center'>
        <Loader light={false} large={true} />
      </div>
    );
  }

  if (isAdmin === false) {
    return <NotAllowed />;
  }

  if (isAdmin === true) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AdminContext.Provider value={isAdmin}>
          <AdminPanelLayout>
            {children}
          </AdminPanelLayout>
        </AdminContext.Provider>
      </ThemeProvider>
    );
  }


    return (
      <div className='bg-[#18181b] h-screen w-full flex justify-center items-center'>
        <Loader light={false} large={true} />
      </div>
    );
  
}