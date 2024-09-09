// @ts-nocheck
"use client"

import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import useMeetingsStore from "@/providers/store/meetingsStore";

export default function MeetingsPage() {
    const {meetings, updateMeetings} = useMeetingsStore();

  return (
    <ContentLayout title="Meetings">
    <Breadcrumb>
      <BreadcrumbList>
        
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Meetings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div className="w-full dark:bg-black bg-[#fff] rounded-lg min-h-[calc(100vh-148px)] mt-4 overflow-y-auto px-4 py-4 sm:pt-8 sm:px-8 flex justify-center flex-col">
        <h2 className="text-4xl max-sm:text-3xl tracking-tighter font-semibold dark:text-slate-100 text-zinc-700">Meetings</h2>
        <main className="flex flex-1 flex-col gap-x-4 py-4 pt-2 md:gap-2 md:py-0">
          <DataTable columns={columns} data={meetings} for="meeting" />
        </main>
      </div>
  </ContentLayout>
  );
}
