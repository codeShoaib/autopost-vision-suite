
import { CheckCircle, Clock, MailWarning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock notifications data
const notifications = [
  {
    id: "1",
    title: "Post published successfully",
    description: "Your scheduled post was published to Twitter.",
    time: "Just now",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "LinkedIn connection error",
    description: "Failed to post to LinkedIn. Please check your connection settings.",
    time: "2 hours ago",
    read: false,
    type: "error",
  },
  {
    id: "3",
    title: "Post scheduled",
    description: "Your post has been scheduled for tomorrow at 9:00 AM.",
    time: "5 hours ago",
    read: true,
    type: "info",
  },
];

export const NotificationsList = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Recent Notifications</CardTitle>
        <Badge variant="outline">3 new</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={cn(
                "flex items-start space-x-4 rounded-md p-3 transition-all",
                !notification.read && "bg-muted/40",
                notification.type === "error" && !notification.read && "bg-red-50"
              )}
            >
              <Avatar className={cn(
                "h-9 w-9",
                notification.type === "success" && "bg-green-100",
                notification.type === "error" && "bg-red-100",
                notification.type === "info" && "bg-blue-100",
              )}>
                <AvatarFallback className={cn(
                  notification.type === "success" && "text-green-500",
                  notification.type === "error" && "text-red-500",
                  notification.type === "info" && "text-blue-500",
                )}>
                  {notification.type === "success" && <CheckCircle className="h-4 w-4" />}
                  {notification.type === "error" && <MailWarning className="h-4 w-4" />}
                  {notification.type === "info" && <Clock className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
