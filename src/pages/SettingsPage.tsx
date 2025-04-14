
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Clock, Bell, Shield, Globe, Palette } from 'lucide-react';

const SettingsPage = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" defaultValue="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" defaultValue="jane@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Your username" defaultValue="janedoe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="Your website" defaultValue="https://example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    rows={3} 
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Tell us a bit about yourself"
                    defaultValue="Social media manager with 5 years of experience in content strategy and community building."
                  ></textarea>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Timezone Settings</CardTitle>
                <CardDescription>
                  Configure your preferred timezone for scheduling posts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select id="timezone" className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                      <option value="UTC+8">China Standard Time (UTC+8)</option>
                      <option value="UTC+9">Japan Standard Time (UTC+9)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format">Time Format</Label>
                    <select id="format" className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="12h">12-hour (2:30 PM)</option>
                      <option value="24h">24-hour (14:30)</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-timezone" />
                  <Label htmlFor="auto-timezone">Automatically adjust for daylight saving time</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how and when you want to be notified.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-4 flex items-center">
                      <Bell className="h-4 w-4 mr-2" /> Email Notifications
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="post-published" className="flex-1">When my posts are published</Label>
                        <Switch id="post-published" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <Label htmlFor="post-engagement" className="flex-1">When my posts receive engagement</Label>
                        <Switch id="post-engagement" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <Label htmlFor="scheduled-reminder" className="flex-1">Scheduled post reminders</Label>
                        <Switch id="scheduled-reminder" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <Label htmlFor="product-updates" className="flex-1">Product updates and news</Label>
                        <Switch id="product-updates" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-4 flex items-center">
                      <Clock className="h-4 w-4 mr-2" /> Push Notifications
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-success" className="flex-1">Successful posts</Label>
                        <Switch id="push-success" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-failed" className="flex-1">Failed posts</Label>
                        <Switch id="push-failed" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-engagement" className="flex-1">Engagement milestones</Label>
                        <Switch id="push-engagement" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-2" /> Password
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button>Change Password</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium mb-2">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Add an extra layer of security to your account</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        We'll send you a code via email or authenticator app when you log in on a new device.
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium mb-2">Sessions</h4>
                  <div>
                    <p className="text-sm">You're currently signed in on these devices:</p>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div>
                          <p className="text-sm font-medium">Current Browser</p>
                          <p className="text-xs text-muted-foreground">Last active: Just now</p>
                        </div>
                        <Button variant="outline" size="sm">This Device</Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div>
                          <p className="text-sm font-medium">iPhone • Safari</p>
                          <p className="text-xs text-muted-foreground">Last active: 2 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">Sign Out</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="destructive">Sign Out of All Devices</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the application looks on your device.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium mb-4 flex items-center">
                    <Palette className="h-4 w-4 mr-2" /> Theme
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border rounded-md p-3 cursor-pointer bg-secondary/20 flex flex-col items-center border-primary">
                      <span className="w-8 h-8 rounded-full bg-gray-200 mb-2"></span>
                      <span className="text-xs">Light</span>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer bg-secondary/20 flex flex-col items-center">
                      <span className="w-8 h-8 rounded-full bg-slate-800 mb-2"></span>
                      <span className="text-xs">Dark</span>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer bg-secondary/20 flex flex-col items-center">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-slate-800 mb-2"></span>
                      <span className="text-xs">System</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Accent Color</h4>
                  <div className="grid grid-cols-6 gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer ring-2 ring-offset-2 ring-blue-500"></div>
                    <div className="w-8 h-8 rounded-full bg-indigo-500 cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-violet-500 cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-pink-500 cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-amber-500 cursor-pointer"></div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Reduce Motion</h4>
                    <p className="text-muted-foreground text-xs mt-1">Minimize animations</p>
                  </div>
                  <Switch id="reduce-motion" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Configure advanced options for the application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Globe className="h-4 w-4 mr-2" /> Language & Region
                    </h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select id="language" className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                          <option value="en-US">English (US)</option>
                          <option value="en-GB">English (UK)</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="ja">Japanese</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <select id="date-format" className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Data & Privacy</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Data Analytics</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Allow us to collect anonymous usage data to improve the application
                        </p>
                      </div>
                      <Switch id="analytics" defaultChecked />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Export Data</h4>
                    <p className="text-sm">Download all your data including posts, statistics, and account information</p>
                    <Button variant="outline">Export Data</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-red-500">Danger Zone</h4>
                    <div className="rounded-md border border-red-200 p-4">
                      <h5 className="text-sm font-medium">Delete Account</h5>
                      <p className="text-xs text-muted-foreground mt-1 mb-4">
                        Once you delete your account, there is no going back. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm">Delete Account</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline">Reset to Default</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
