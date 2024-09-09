"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

export type Meeting = {
  _id: string;
  createdBy: string;
  meetingId: string;
  createdAt: string;
  totalUsers: any[]; // Consider using a more specific type if the structure is known
  activeUsers: any[]; // Consider using a more specific type if the structure is known

  title: string;
  description: string | null;
  endedAt: string | null;
  scheduledAt: string | null;
  startsAt: string;
  endMeetingTimeout: string | null;
  isStarted: boolean;
  isScheduled: boolean;
  isEnded: boolean;
  __v: number;
}




export const columns: ColumnDef<Meeting>[] = [
  {
    accessorKey: "Meetings",
    header: "Meetings",
    cell: ({ row }) => {
      const by = row.original.createdBy
      const title = row.original.title || ''
      
      return (
        <div className="flex items-center">
          <div className="grid gap-0.5">
            <p className="text-sm font-medium leading-none">
              {title.trim() || 'Unknown Meeting'}
            </p>
            <p className="text-xs text-muted-foreground">
              Created by: {by}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "Joined-Users",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-full"
      >
        Joined Users
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const totalUsers = row.original.totalUsers
      
      return (
        <div className="flex justify-center">
          <AnimatedTooltip items={totalUsers} />
        </div>
      )
    },
  },
  
  {
    accessorKey: "startsAt",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Starts At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const formatDate = (dateString: string | number | Date): string => {
        const date = new Date(dateString);
        const now = new Date();
      
        const formatOptions = (options: Intl.DateTimeFormatOptions): string => 
          date.toLocaleString('en-US', options);
      
        const timeFormat: Intl.DateTimeFormatOptions = { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        };
      
        const dateFormat: Intl.DateTimeFormatOptions = { 
          day: 'numeric', 
          month: 'short'
        };
      
        if (date.getFullYear() === now.getFullYear()) {
          // For dates in the current year: "12:30 PM, 12 Aug"
          return `${formatOptions(timeFormat)}, ${formatOptions(dateFormat)}`;
        } else {
          // For dates in other years: "12 Aug 2022"
          return formatOptions({ ...dateFormat, year: 'numeric' });
        }
      };
      const createdAt = row.original.createdAt
      return <div className="text-center font-medium">{createdAt ? formatDate(createdAt): (<div className="dark:text-white text-zinc-900 text-medium">No Data</div>)}</div>
    },
  },
  {
    accessorKey: "endedAt",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Ended At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const formatDate = (dateString: string | number | Date | null): string => {
        if (!dateString) return 'Not Ended Yet'
        
        const date = new Date(dateString);
        const now = new Date();
      
        const formatOptions = (options: Intl.DateTimeFormatOptions): string => 
          date.toLocaleString('en-US', options);
      
        const timeFormat: Intl.DateTimeFormatOptions = { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        };
      
        const dateFormat: Intl.DateTimeFormatOptions = { 
          day: 'numeric', 
          month: 'short'
        };
      
        if (date.getFullYear() === now.getFullYear()) {
          // For dates in the current year: "12:30 PM, 12 Aug"
          return `${formatOptions(timeFormat)}, ${formatOptions(dateFormat)}`;
        } else {
          // For dates in other years: "12 Aug 2022"
          return formatOptions({ ...dateFormat, year: 'numeric' });
        }
      };
      const endedAt = row.original.endedAt
      return  <div className="text-center font-medium">{endedAt === "not ended yet" ? (<div className="dark:text-white text-zinc-900 text-medium">No Ended Yet</div>):formatDate(endedAt) }</div>
    },
  },
  {
    accessorKey: "type",
    header: () => <div className="text-center">Type</div>,
    cell: ({ row }) => {
      const type = row.original.isScheduled ? "Scheduled" : "Instant"
      return (
        <div className={`text-center font-medium ${type === "Instant" ? "text-blue-500" : "text-green-500"}`}>
          {type}
        </div>

      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View user details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]