
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Edit2,
  Facebook,
  Linkedin,
  MoreHorizontal,
  Trash2,
  Twitter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for scheduled posts
const scheduledPosts = [
  {
    id: "1",
    content: "Excited to announce our new product launch! Stay tuned for more details. #ProductLaunch #Innovation",
    platforms: ["Twitter", "LinkedIn"],
    scheduleDate: new Date(2025, 3, 20, 14, 30),
    status: "scheduled",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    content: "Join us for our upcoming webinar on digital marketing strategies for 2025! Register now to secure your spot.",
    platforms: ["Facebook", "LinkedIn"],
    scheduleDate: new Date(2025, 3, 18, 10, 0),
    status: "scheduled",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    content: "Happy to share our latest case study on how we helped our client achieve 200% ROI with our services!",
    platforms: ["Twitter", "LinkedIn", "Facebook"],
    scheduleDate: new Date(2025, 3, 15, 9, 0),
    status: "published",
    image: "/placeholder.svg",
  },
];

export const ScheduledPosts = () => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Twitter":
        return <Twitter className="h-4 w-4 text-[#1DA1F2]" />;
      case "LinkedIn":
        return <Linkedin className="h-4 w-4 text-[#0A66C2]" />;
      case "Facebook":
        return <Facebook className="h-4 w-4 text-[#1877F2]" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Scheduled Posts</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.image} alt="Post image" />
                    <AvatarFallback>AP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="line-clamp-2 text-sm">{post.content}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarDays className="mr-1 h-3 w-3" />
                        {format(post.scheduleDate, "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {format(post.scheduleDate, "h:mm a")}
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-auto",
                          post.status === "published" && "bg-green-100 text-green-800 border-green-200",
                          post.status === "scheduled" && "bg-blue-100 text-blue-800 border-blue-200"
                        )}
                      >
                        {post.status === "published" ? (
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                        ) : (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {post.status === "published" ? "Published" : "Scheduled"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit2 className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center space-x-2">
                {post.platforms.map((platform) => (
                  <div key={platform} className="flex items-center">
                    {getPlatformIcon(platform)}
                  </div>
                ))}
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
