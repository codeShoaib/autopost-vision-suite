
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Twitter, Linkedin, Facebook, Check, Link, Unlink } from 'lucide-react';

type SocialPlatform = {
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  username?: string;
};

const ConnectionsPage = () => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, connected: false },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, connected: false },
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, connected: false },
  ]);

  const handleConnect = (index: number) => {
    const updatedPlatforms = [...platforms];
    updatedPlatforms[index] = {
      ...updatedPlatforms[index],
      connected: !updatedPlatforms[index].connected,
      username: updatedPlatforms[index].connected ? undefined : `user_${Math.floor(Math.random() * 1000)}`,
    };
    
    setPlatforms(updatedPlatforms);
    
    toast({
      title: updatedPlatforms[index].connected ? 
        `Connected to ${updatedPlatforms[index].name}` : 
        `Disconnected from ${updatedPlatforms[index].name}`,
      description: updatedPlatforms[index].connected ?
        `You've successfully connected your ${updatedPlatforms[index].name} account.` :
        `You've disconnected your ${updatedPlatforms[index].name} account.`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Social Connections</h1>
          <p className="text-muted-foreground">
            Connect your social media accounts to automatically post content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <Card key={platform.name} className="overflow-hidden hover-scale card-gradient">
              <div className={`h-1 w-full ${platform.connected ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {platform.icon}
                    <CardTitle>{platform.name}</CardTitle>
                  </div>
                  {platform.connected && (
                    <div className="flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </div>
                  )}
                </div>
                <CardDescription>
                  {platform.connected 
                    ? `Posting as @${platform.username}`
                    : `Connect your ${platform.name} account to post content.`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {platform.connected
                    ? `Your ${platform.name} account is connected and ready to receive posts from AutoPost.`
                    : `By connecting your ${platform.name} account, AutoPost can publish content on your behalf.`}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant={platform.connected ? "outline" : "default"}
                  className={`w-full ${platform.connected ? 'border-red-200 text-red-500 hover:bg-red-50' : ''}`}
                  onClick={() => handleConnect(index)}
                >
                  {platform.connected ? (
                    <>
                      <Unlink className="mr-2 h-4 w-4" /> Disconnect Account
                    </>
                  ) : (
                    <>
                      <Link className="mr-2 h-4 w-4" /> Connect Account
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Manage your API keys and connection settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Note</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      For security reasons, API keys are stored encrypted and can only be used by the system for posting. 
                      You can revoke access at any time by disconnecting your accounts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ConnectionsPage;
