import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import useUsersStore from "@/providers/store/usersStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';
const RecentUsers = () => {

  const {users, updateUsers} = useUsersStore();
  const router = useRouter();
  

  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    const now = new Date();
   
  
    const formatOptions = (options:any) => date.toLocaleString('en-US', options);
  
 
      if (date.getFullYear() === now.getFullYear()) {
        return formatOptions({ month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      } else {
        return formatOptions({ month: 'short', day: 'numeric', year: 'numeric' });
      }
    }
  
 
  return (
    <Card className="max-sm:px-0 max-sm:py-2 py-4 w-full">
            <CardHeader className="pt-2 sm:pb-2">
              <CardTitle className="sm:ml-2 text-2xl max-sm:text-xl">Recent Users</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-0 mt-0 w-full px-4 max-sm:px-2 pb-0">
              {users.slice(-7).reverse().map((user, index) => (
                <div 
                  key={user._id.toString()} 
                  className="flex items-center justify-between gap-0 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer transition"
                  onClick={() => router.push(`/users/${user._id}`)}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-base tracking-tighter dark:text-zinc-100  text-zinc-900 text-muted-foreground max-sm:hidden  font-medium">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
  )
}

export default RecentUsers