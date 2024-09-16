"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import { ThemeProvider } from "@/providers/theme-provider";

import { createContext, useContext } from "react";

import isAdminStore from "@/providers/store/isAdminState";
import loadingStore from "@/providers/store/loadingState";
import useMeetingsStore from "@/providers/store/meetingsStore";
import useContactsStore from "@/providers/store/contactStore";
import useUsersStore from "@/providers/store/usersStore";
import adminsStore from "@/providers/store/adminsStore";

// Create a context for the admin status
const AdminContext = createContext<boolean | null>(null);

export function useAdmin() {
  return useContext(AdminContext);
}

export default function ClientLayout({
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

  const {meetings, updateMeetings} = useMeetingsStore();
  const {contacts, updateContacts} = useContactsStore();
  const {users, updateUsers} = useUsersStore();
  const{admins,updateAdmins}= adminsStore();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.emailAddresses[0]?.emailAddress && isAdmin === null && !apiRequestMade) {
        updateLoading(true);
        setApiRequestMade(true);
        try {
          const response = await axios.post("/api/", {
            email: user.emailAddresses[0].emailAddress,
          });
          updateIsAdmin(response.data.exists);
          updateMeetings(response.data.meetings);
          updateContacts(response.data.contacts);
          updateUsers(response.data.users);
          updateAdmins(response.data.admins);
        } catch (error) {
          console.error("Error checking admin status:", error);
          updateIsAdmin(false);
        } finally {
          updateLoading(false);
        }
      } else if (!user) {
        updateLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, isAdmin, updateIsAdmin, updateLoading, apiRequestMade, setApiRequestMade]);

  if (loading) {
    return (
      <div className='bg-[#18181b] h-screen w-full flex justify-center items-center'>
        <Loader light={false} large={true} />
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AdminContext.Provider value={isAdmin}>
        {children}
      </AdminContext.Provider>
    </ThemeProvider>
  );
}