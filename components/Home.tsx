import Link from "next/link";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
// import useMeetingsStore from "@/providers/store/meetingsStore";
// import useContactsStore from "@/providers/store/contactStore";
// import useUsersStore from "@/providers/store/usersStore";
// import adminsStore from "@/providers/store/adminsStore";

import Stats from "./Stats";
import RecentUsers from "./RecentUsers";
import RecentMeetings from "./RecentMeetings";

export default function Dashboard() {

  

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full dark:bg-black bg-[#fff] rounded-lg min-h-[calc(100vh-364px)] mt-4 overflow-y-auto px-4 py-6 sm:pt-10 sm:px-10 flex justify-center flex-col">
        <h2 className="text-4xl max-sm:text-3xl tracking-tighter font-semibold  dark:text-slate-100 text-zinc-700 ">Welcome to Nexus Dashboard</h2>
        <p className="sm:-mt-[2px] text-neutral-500 dark:text-zinc-400 text-sm ">Nexus Dashboard will help you to know current nexus stats for admins.</p>
        <main className="flex flex-1 flex-col gap-x-4 py-4 md:gap-8 md:py-6">
          <Stats/>
          <div className="grid gap-4 md:grid-cols-1 xl:grid-cols-2 w-full max-sm:mt-4 ">
          <RecentUsers/>
          <RecentMeetings/>
          </div>
        </main>
      </div>
    </ContentLayout>
  );
}