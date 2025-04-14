
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Image as ImageIcon, Loader2, RefreshCcw, Twitter, Linkedin, Facebook } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export const PostCreate = () => {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const [generatingImage, setGeneratingImage] = useState(false);
  const [schedulingPost, setSchedulingPost] = useState(false);
  const { toast } = useToast();

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleImageGenerate = () => {
    if (!content) {
      toast({
        title: "Content required",
        description: "Please write post content first to generate a relevant image.",
        variant: "destructive",
      });
      return;
    }
    
    setGeneratingImage(true);
    // Simulate API call to Together.AI
    setTimeout(() => {
      setGeneratingImage(false);
      toast({
        title: "Image generated",
        description: "AI image has been generated based on your content.",
      });
    }, 2000);
  };

  const handleSchedulePost = () => {
    if (!content) {
      toast({
        title: "Content required",
        description: "Please write post content before scheduling.",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to post to.",
        variant: "destructive",
      });
      return;
    }
    
    setSchedulingPost(true);
    // Simulate API call to schedule post
    setTimeout(() => {
      setSchedulingPost(false);
      toast({
        title: "Post scheduled",
        description: `Your post has been scheduled to ${selectedPlatforms.join(", ")} on ${date ? format(date, "PPP") : "today"}.`,
      });
      
      // Reset form
      setContent("");
      setSelectedPlatforms([]);
      setDate(undefined);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold mb-1">Create New Post</h1>
        <p className="text-muted-foreground">
          Draft your social media post, generate images with AI, and schedule it across platforms.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>
                Write your post content or use AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What would you like to share today?"
                className="min-h-32 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                {content.length} / 280 characters
              </div>
              <Button 
                variant="outline" 
                className="flex gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                AI Suggestions
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Visual</CardTitle>
              <CardDescription>
                Generate an AI image based on your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 border rounded-lg h-48 flex items-center justify-center">
                {generatingImage ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Generating image...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No image generated</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleImageGenerate} 
                disabled={generatingImage}
                className="w-full"
              >
                {generatingImage && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Image with AI
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
              <CardDescription>
                Configure when and where to post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedPlatforms.includes("Twitter") ? "default" : "outline"}
                    className={cn(
                      "flex items-center gap-2",
                      selectedPlatforms.includes("Twitter") && "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
                    )}
                    onClick={() => handlePlatformToggle("Twitter")}
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Button>
                  <Button
                    variant={selectedPlatforms.includes("LinkedIn") ? "default" : "outline"}
                    className={cn(
                      "flex items-center gap-2",
                      selectedPlatforms.includes("LinkedIn") && "bg-[#0A66C2] hover:bg-[#0A66C2]/90"
                    )}
                    onClick={() => handlePlatformToggle("LinkedIn")}
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button
                    variant={selectedPlatforms.includes("Facebook") ? "default" : "outline"}
                    className={cn(
                      "flex items-center gap-2",
                      selectedPlatforms.includes("Facebook") && "bg-[#1877F2] hover:bg-[#1877F2]/90"
                    )}
                    onClick={() => handlePlatformToggle("Facebook")}
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Schedule</h3>
                <Tabs defaultValue="date">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="date">Date & Time</TabsTrigger>
                    <TabsTrigger value="best">Best Time</TabsTrigger>
                  </TabsList>
                  <TabsContent value="date" className="space-y-4 pt-4">
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </TabsContent>
                  <TabsContent value="best" className="pt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      We'll automatically post at the optimal time for your audience engagement
                    </p>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="weekend">This weekend</SelectItem>
                        <SelectItem value="monday">Next Monday</SelectItem>
                      </SelectContent>
                    </Select>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                onClick={handleSchedulePost}
                disabled={schedulingPost}
              >
                {schedulingPost && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Schedule Post
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
