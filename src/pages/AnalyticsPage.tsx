
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Users, Share2, MessageSquare } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Sample data for engagement analytics
const engagementData = [
  { name: 'Mon', likes: 120, shares: 45, comments: 67 },
  { name: 'Tue', likes: 150, shares: 53, comments: 88 },
  { name: 'Wed', likes: 180, shares: 68, comments: 102 },
  { name: 'Thu', likes: 170, shares: 82, comments: 110 },
  { name: 'Fri', likes: 190, shares: 105, comments: 140 },
  { name: 'Sat', likes: 230, shares: 94, comments: 129 },
  { name: 'Sun', likes: 210, shares: 87, comments: 119 },
];

// Sample data for platform distribution
const platformData = [
  { name: 'Twitter', value: 45 },
  { name: 'LinkedIn', value: 30 },
  { name: 'Facebook', value: 25 },
];

const COLORS = ['#3b82f6', '#4f46e5', '#0ea5e9'];

const statsItems = [
  { title: 'Total Engagement', value: '12,453', change: '+14%', icon: TrendingUp, color: 'blue' },
  { title: 'Audience Reach', value: '34.2K', change: '+7%', icon: Users, color: 'indigo' },
  { title: 'Shares', value: '2,845', change: '+9%', icon: Share2, color: 'sky' },
  { title: 'Comments', value: '4,128', change: '+23%', icon: MessageSquare, color: 'violet' },
];

const AnalyticsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track the performance of your social media posts and campaigns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsItems.map((item, index) => (
            <Card key={index} className="card-gradient hover-scale">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">{item.title}</span>
                  <div className={`bg-${item.color}-500/20 rounded-full p-2`}>
                    <item.icon className={`h-5 w-5 text-${item.color}-500`} />
                  </div>
                </div>
                <div className="flex items-baseline space-x-2">
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                  <span className={`text-xs font-medium text-${item.color}-500`}>
                    {item.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 card-gradient">
            <CardHeader>
              <CardTitle>Engagement Overview</CardTitle>
              <CardDescription>Weekly engagement performance across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={engagementData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Bar dataKey="likes" fill="#3b82f6" name="Likes" />
                    <Bar dataKey="shares" fill="#4f46e5" name="Shares" />
                    <Bar dataKey="comments" fill="#0ea5e9" name="Comments" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Platform Distribution</CardTitle>
              <CardDescription>Engagement by social platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                {platformData.map((platform, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{platform.name}</span>
                      <span>{platform.value}%</span>
                    </div>
                    <Progress value={platform.value} className="h-2" 
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)', 
                               '--tw-progress-bar': COLORS[index % COLORS.length] }} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
