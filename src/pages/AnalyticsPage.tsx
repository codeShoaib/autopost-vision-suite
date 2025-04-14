
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, Users, BarChart3, TrendingUp } from 'lucide-react';

const AnalyticsPage = () => {
  // Sample analytics data
  const data = {
    engagement: [
      { name: 'Jan', twitter: 400, linkedin: 240, facebook: 320 },
      { name: 'Feb', twitter: 300, linkedin: 139, facebook: 221 },
      { name: 'Mar', twitter: 200, linkedin: 980, facebook: 229 },
      { name: 'Apr', twitter: 278, linkedin: 390, facebook: 200 },
      { name: 'May', twitter: 189, linkedin: 480, facebook: 218 },
      { name: 'Jun', twitter: 239, linkedin: 380, facebook: 250 },
      { name: 'Jul', twitter: 349, linkedin: 430, facebook: 210 },
    ],
    performance: [
      { name: 'Twitter', value: 40 },
      { name: 'LinkedIn', value: 30 },
      { name: 'Facebook', value: 30 },
    ],
    growth: [
      { name: 'Week 1', followers: 400 },
      { name: 'Week 2', followers: 425 },
      { name: 'Week 3', followers: 450 },
      { name: 'Week 4', followers: 475 },
      { name: 'Week 5', followers: 525 },
      { name: 'Week 6', followers: 550 },
      { name: 'Week 7', followers: 580 },
    ],
    metrics: [
      { title: 'Total Followers', value: '12,580', change: '+12%', icon: Users },
      { title: 'Engagement Rate', value: '5.2%', change: '+1.2%', icon: TrendingUp },
      { title: 'Posts Published', value: '48', change: '+8', icon: BarChart3 },
      { title: 'Click-through Rate', value: '3.8%', change: '+0.5%', icon: ArrowUpRight },
    ]
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your social media performance across platforms.
          </p>
        </div>
        
        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.metrics.map((metric, index) => (
            <Card key={index} className="card-gradient">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                    <p className={`text-xs font-medium mt-1 ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change} since last month
                    </p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <metric.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Performance by Platform</CardTitle>
                <CardDescription>
                  Distribution of engagement across your social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart
                    data={data.performance}
                    index="name"
                    categories={['value']}
                    valueFormatter={(value) => `${value}%`}
                    colors={['#3b82f6', '#0ea5e9', '#38bdf8']}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
                <CardDescription>
                  Monthly engagement across all your social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart
                    data={data.engagement}
                    index="name"
                    categories={['twitter', 'linkedin', 'facebook']}
                    colors={['#1DA1F2', '#0A66C2', '#1877F2']}
                    valueFormatter={(value) => `${value} engagements`}
                    style={{
                      fontSize: '12px',
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="followers" className="space-y-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Followers Growth</CardTitle>
                <CardDescription>
                  Weekly increase in followers across all platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart
                    data={data.growth}
                    index="name"
                    categories={['followers']}
                    colors={['#8b5cf6']}
                    valueFormatter={(value) => `${value} followers`}
                    style={{
                      fontSize: '12px',
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
