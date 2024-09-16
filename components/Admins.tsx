// @ts-nocheck


"use client"

import { useState, useMemo } from 'react'
import { useUser } from "@clerk/nextjs";
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PlusIcon, SearchIcon, Trash2Icon, Ban } from "lucide-react"
import adminsStore from "@/providers/store/adminsStore"
import useUsersStore from "@/providers/store/usersStore"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { X } from "lucide-react"

interface Admin {
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

export default function AdminList() {
  const { user } = useUser();
  const { admins, updateAdmins, addAdmin, deleteAdmin } = adminsStore();
  const { users } = useUsersStore();
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingAdminEmail, setLoadingAdminEmail] = useState<string | null>(null)
  const [alertInfo, setAlertInfo] = useState<{ show: boolean; message: string; type: 'error' | 'success' }>({ show: false, message: '', type: 'error' })

  const isOwner = user?.emailAddresses[0]?.emailAddress === "utkarshweb2023@gmail.com";

  const adminList = useMemo(() => {
    if (!Array.isArray(admins)) return [];
    return admins.map((admin: Admin) => {
      const userDetails = users.find((user: any) => user.email === admin.email);
      return { ...admin, ...userDetails };
    });
  }, [admins, users]);

  const filteredAdmins = useMemo(() => {
    return adminList.filter((admin: Admin) => 
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [adminList, searchQuery]);

  const handleAddAdmin = async () => {
    const adminExists = admins.some((admin: Admin) => admin.email === newAdminEmail);
    if (adminExists) {
      setAlertInfo({ show: true, message: 'This email is already registered as an admin.', type: 'error' });
      return;
    }

    const userExists = users.some((user: any) => user.email === newAdminEmail);
    if (!userExists) {
      setAlertInfo({ show: true, message: 'The provided email is not registered as a user.', type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/admin/add', { email: newAdminEmail });
      updateAdmins(response.data.admins);
      setNewAdminEmail('');
      setIsDialogOpen(false);
      setAlertInfo({ show: true, message: 'Admin added successfully.', type: 'success' });
    } catch (error) {
      console.error("Error adding admin:", error);
      setAlertInfo({ show: true, message: 'Failed to add admin. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteAdmin = async (email: string) => {
    setIsLoading(true);
    setLoadingAdminEmail(email);
    try {
      const response = await axios.post('/api/admin/remove', { email });
      updateAdmins(response.data.admins);
      setAlertInfo({ show: true, message: 'Admin removed successfully.', type: 'success' });
    } catch (error) {
      console.error("Error removing admin:", error);
      setAlertInfo({ show: true, message: 'Failed to remove admin. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
      setLoadingAdminEmail(null);
    }
  }

  return (
    <div className={`relative ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {alertInfo.show && (
        <div className="fixed top-4 right-4 z-50">
          <Alert variant={alertInfo.type === 'error' ? "destructive" : "default"} className="w-96">
            <AlertTitle>{alertInfo.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
            <AlertDescription>{alertInfo.message}</AlertDescription>
            <Button 
              variant="ghost" 
              className="absolute top-2 right-2 p-0 h-auto" 
              onClick={() => setAlertInfo({ ...alertInfo, show: false })}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-[24rem] items-center space-x-2">
          <Input
            placeholder="Search admins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
        </div>
        {isOwner && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={isLoading}>
                <PlusIcon className="mr-2 h-4 w-4" /> Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admin</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <Label htmlFor="email" className="text-right">
                    Enter Email:
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddAdmin} disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Admin
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">Avatar</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              {isOwner && <TableHead className="text-center">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.map((admin: Admin) => (
              <TableRow key={admin.email}>
                <TableCell className="text-center">
                  <Avatar>
                    <AvatarImage src={admin.image} alt={`${admin.firstName} ${admin.lastName}`} />
                    <AvatarFallback>{admin.firstName?.[0]}{admin.lastName?.[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-center">{admin.firstName} {admin.lastName}</TableCell>
                <TableCell className="text-center">{admin.email}</TableCell>
                <TableCell className="text-center">{admin.email === "utkarshweb2023@gmail.com" ? "Owner" : "Admin"}</TableCell>
                {isOwner && (
                  <TableCell className="text-center">
                    {admin.email === "utkarshweb2023@gmail.com" ? (
                      <Button variant="ghost" size="icon" disabled>
                        <Ban className="h-4 w-4 text-gray-400" />
                        <span className="sr-only">Cannot modify owner</span>
                      </Button>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" disabled={isLoading}>
                            {loadingAdminEmail === admin.email ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2Icon className="h-4 w-4 text-red-500" />
                            )}
                            <span className="sr-only">Delete admin</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will remove the admin privileges for this account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteAdmin(admin.email)} disabled={isLoading}>
                              Remove Admin
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
