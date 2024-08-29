// @ts-nocheck


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Mail, Users, Video, Videotape } from "lucide-react";
import useMeetingsStore from "@/providers/store/meetingsStore";
import useContactsStore from "@/providers/store/contactStore";
import useUsersStore from "@/providers/store/usersStore";

const Stats = () => {
     const {meetings, updateMeetings} = useMeetingsStore();
  const {contacts, updateContacts} = useContactsStore();
  const {users, updateUsers} = useUsersStore();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const usersAnalytics = users.filter(user => {
    const userJoinDate = new Date(user.createdAt);
    return userJoinDate >= thirtyDaysAgo;
  }).length;
  const meetingsAnalytics = meetings.filter(meeting => {
    const meetingCreatedDate = new Date(meeting.createdAt);
    return meetingCreatedDate >= thirtyDaysAgo;
  }).length;
  const contactsAnalytics = contacts.filter(contact => {
    const contactCreatedDate = new Date(contact.createdAt);
    return contactCreatedDate >= thirtyDaysAgo;
  }).length;
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                +{usersAnalytics} from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Meetings
                </CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{meetings ? meetings.length : 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{meetingsAnalytics} from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contacts</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contacts.length}</div>
                <p className="text-xs text-muted-foreground">
                  +{contactsAnalytics} from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Public Meetings</CardTitle>
                <Videotape className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
  )
}

export default Stats