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
import useContactsStore from "@/providers/store/contactStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Clock, Mail } from "lucide-react";
import { format } from 'date-fns';

export default function MeetingsPage() {
  const { contacts } = useContactsStore();

  const handleCardClick = (email:string, message:string,firstName:string) => {
    const subject = encodeURIComponent(`Thanks, ${firstName} for contacting Nexus!`);
    const body = encodeURIComponent(`\n Thanks, ${firstName} for contacting Nexus! \n Your orginal message:\n ${message} \n\n\n Thanks,\n Nexus Team`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <ContentLayout title="Contacts">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contacts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full dark:bg-black bg-[#fff] rounded-lg min-h-[calc(100vh-148px)] mt-4 overflow-y-auto px-4 py-4 sm:pt-8 sm:px-8 flex  flex-col">
        <h2 className="text-4xl max-sm:text-3xl tracking-tighter font-semibold dark:text-slate-100 text-zinc-700 leading-tight">Contacts</h2>
        <p className="text-sm dark:text-zinc-400 text-zinc-700">Access and Reply Nexus Contact Form Messages Instantly.</p>
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 py-4 pt-2 md:py-0 mt-6">
          {contacts?.map((contact:any, index:number) => (
            <Card 
              key={index} 
              className="overflow-hidden shadow-lg hover:shadow-xl duration-300 h-min w-full dark:hover:border-zinc-500 hover:border-zinc-700 dark:hover:bg-zinc-900 hover:bg-zinc-100 transition py-3 px-[6px] cursor-pointer"
              onClick={() => handleCardClick(contact.email, contact.message,contact.firstName)}
            >
              <CardHeader className="flex flex-row items-center gap-2 px-3 pb-4 pt-2">
                <div>
                  <h3 className="text-xl font-semibold">{contact.firstName} {contact.lastName}</h3>
                  <div className="flex items-center text-sm text-zinc-800 dark:text-zinc-200">
                    <Mail className="w-4 h-4 mr-1" />
                    <span>{contact.email}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3">
                <p className="dark:text-zinc-100 text-zinc-900 font-medium text-base">{contact.message}</p>
              </CardContent>
              <CardFooter className="px-3 flex items-center text-xs dark:text-zinc-300 text-zinc-800 -mb-2">
                <Clock className="w-4 h-4 mr-1" />
                <span>{format(new Date(contact.createdAt), "h:mm a dd MMM yyyy")}</span>
              </CardFooter>
            </Card>
          ))}
        </main>
      </div>
    </ContentLayout>
  );
}