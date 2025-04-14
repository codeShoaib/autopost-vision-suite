
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
import { 
  CalendarIcon, 
  Image as ImageIcon, 
  Loader2, 
  RefreshCcw, 
  Twitter, 
  Linkedin, 
  Facebook,
  Wand2,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { generateText } from "@/services/openrouter_service";
import { generateImage } from "@/services/replicate_service";
import { usePostStore } from "@/store/postStore";

interface AIPromptInputs {
  topic: string;
  tone: string;
  platform: string;
}

export const PostGenerator = () => {
  // Content state
  const [content, setContent] = useState("");
  const [generatingContent, setGeneratingContent] = useState(false);
  const [promptInputs, setPromptInputs] = useState<AIPromptInputs>({
    topic: "",
    tone: "professional",
    platform: "twitter"
  });
  
  // Image state
  const [imageUrl, setImageUrl] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [imageStyle, setImageStyle] = useState("photorealistic");
  
  // Scheduling state
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("12:00");
  const [schedulingPost, setSchedulingPost] = useState(false);
  
  const { toast } = useToast();
  const { addPost } = usePostStore();
  
  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };
  
  const handleGenerateContent = async () => {
    if (!promptInputs.topic) {
      toast({
        title: "Topic required",
        description: "Please enter a topic to generate content about.",
        variant: "destructive",
      });
      return;
    }
    
    setGeneratingContent(true);
    
    try {
      const result = await generateText({
        prompt: promptInputs.topic,
        platform: promptInputs.platform as 'twitter' | 'linkedin' | 'facebook',
        tone: promptInputs.tone as 'professional' | 'casual' | 'humorous',
      });
      
      setContent(result);
      
      // Also update the image prompt with the topic for consistency
      setImagePrompt(promptInputs.topic);
      
      toast({
        title: "Content generated",
        description: "AI content has been generated based on your inputs.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setGeneratingContent(false);
    }
  };
  
  const handleGenerateImage = async () => {
    if (!imagePrompt) {
      toast({
        title: "Prompt required",
        description: "Please enter an image prompt or generate content first.",
        variant: "destructive",
      });
      return;
    }
    
    setGeneratingImage(true);
    
    try {
      const result = await generateImage({
        prompt: imagePrompt,
        style: imageStyle as 'photorealistic' | 'cartoon' | 'abstract' | '3d-render',
      });
      
      setImageUrl(result);
      toast({
        title: "Image generated",
        description: "AI image has been generated based on your prompt.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setGeneratingImage(false);
    }
  };
  
  const handleSchedulePost = () => {
    if (!content) {
      toast({
        title: "Content required",
        description: "Please write or generate post content before scheduling.",
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
    
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date for scheduling.",
        variant: "destructive",
      });
      return;
    }
    
    setSchedulingPost(true);
    
    try {
      // Prepare scheduled date/time
      const scheduledDate = new Date(date);
      const [hours, minutes] = time.split(':').map(Number);
      scheduledDate.setHours(hours, minutes);
      
      // Convert platform names to expected format
      const platformsFormatted = selectedPlatforms.map(p => p.toLowerCase() as 'twitter' | 'linkedin' | 'facebook');
      
      // Add post to store
      addPost({
        content,
        imageUrl: imageUrl || undefined,
        scheduledFor: scheduledDate,
        platforms: platformsFormatted,
        status: 'scheduled',
      });
      
      toast({
        title: "Post scheduled",
        description: `Your post has been scheduled to ${selectedPlatforms.join(", ")} on ${format(scheduledDate, "PPP")} at ${time}.`,
      });
      
      // Reset form
      setContent("");
      setImageUrl("");
      setImagePrompt("");
      setSelectedPlatforms([]);
      setDate(undefined);
      setTime("12:00");
    } catch (error) {
      toast({
        title: "Scheduling failed",
        description: "Failed to schedule post. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setSchedulingPost(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gradient-primary">Generate AI Post</h1>
        <p className="text-muted-foreground">
          Create engaging social media content with AI assistance, then schedule it across platforms.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" /> 
                AI Content Generator
              </CardTitle>
              <CardDescription>
                Generate post content using AI based on your topic and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <label className="text-sm font-medium mb-1 block">Topic/Prompt</label>
                  <Input 
                    placeholder="E.g., New product launch, Industry trends, Customer success story"
                    value={promptInputs.topic}
                    onChange={(e) => setPromptInputs({...promptInputs, topic: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Tone</label>
                  <Select 
                    value={promptInputs.tone}
                    onValueChange={(value) => setPromptInputs({...promptInputs, tone: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Platform</label>
                  <Select 
                    value={promptInputs.platform}
                    onValueChange={(value) => setPromptInputs({...promptInputs, platform: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button 
                    onClick={handleGenerateContent}
                    disabled={generatingContent || !promptInputs.topic}
                    className="w-full"
                  >
                    {generatingContent && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Generate Content
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Content</label>
                <Textarea
                  placeholder="Your AI-generated content will appear here. You can edit it after generation."
                  className="min-h-32 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                AI Image Generator
              </CardTitle>
              <CardDescription>
                Generate an AI image based on your prompt or post content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-3">
                  <Input 
                    placeholder="Enter an image description"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                  />
                </div>
                <div>
                  <Select 
                    value={imageStyle}
                    onValueChange={setImageStyle}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photorealistic">Realistic</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="abstract">Abstract</SelectItem>
                      <SelectItem value="3d-render">3D Render</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="bg-muted/50 border rounded-lg h-64 flex items-center justify-center overflow-hidden">
                {generatingImage ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Generating image...</p>
                  </div>
                ) : imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Generated AI image" 
                    className="w-full h-full object-contain" 
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No image generated yet</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleGenerateImage} 
                disabled={generatingImage || !imagePrompt}
                className="w-full"
              >
                {generatingImage && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Image
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="card-gradient sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Schedule Post
              </CardTitle>
              <CardDescription>
                Configure when and where to publish your content
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
                <h3 className="text-sm font-medium">Date</h3>
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Time</h3>
                <Select value={time} onValueChange={setTime}>
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
              </div>
              
              <div className="bg-muted/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Post Summary</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  {content ? `${content.substring(0, 60)}...` : "No content yet"}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  Platforms: {selectedPlatforms.length ? selectedPlatforms.join(", ") : "None selected"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {date ? `Scheduled for ${format(date, "MMM d")} at ${time}` : "Not scheduled"}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                onClick={handleSchedulePost}
                disabled={schedulingPost || !content || selectedPlatforms.length === 0 || !date}
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
