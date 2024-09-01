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

export type User = {
  _id: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  totalMeetings: any[]; // Consider using a more specific type if the structure is known
  createdMeetings: any[]; // Consider using a more specific type if the structure is known
  publicMeetings: any[]; // This is an empty array in the example
  clerkId: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  isPrivate: boolean;
  __v: number;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const email = row.original.email
      const image = row.original.image
      const firstName = row.original.firstName || ''
      const lastName = row.original.lastName || ''
      const initials = `${firstName.charAt(0) || ''}${lastName.charAt(0) || ''}`.toUpperCase() || 'U'
      
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={image} alt={`${firstName} ${lastName}`.trim() || 'User'} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0">
            <p className="text-sm font-medium leading-none">
              {`${firstName} ${lastName}`.trim() || 'Unknown User'}
            </p>
            <p className="text-[12px] text-muted-foreground">
              {email}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const username = row.original.username
      return <div className="text-center font-medium">{username}</div>
    },
  },
  {
    accessorKey: "totalMeetings",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Meetings
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const totalMeetings = row.original.totalMeetings
      return (
        <div className="text-center font-medium">
          {totalMeetings.length} <span className="ml-1">Meetings</span>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Joined On
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
      return <div className="text-center font-medium">{formatDate(createdAt)}</div>
    },
  },
  {
    accessorKey: "isPrivate",
    header: () => <div className="text-center">Profile</div>,
    cell: ({ row }) => {
      const type = row.original.isPrivate ? "Private" : "Public"
      return (
        <div className={`text-center font-medium ${type === "Private" ? "text-blue-500" : "text-green-500"}`}>
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