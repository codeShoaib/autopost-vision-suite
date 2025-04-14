
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PostStats } from '@/components/dashboard/PostStats';
import { ScheduledPosts } from '@/components/dashboard/ScheduledPosts';
import { NotificationsList } from '@/components/dashboard/NotificationsList';
import { EngagementChart } from '@/components/dashboard/EngagementChart';

const DashboardPage = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your social media activities.
          </p>
        </div>
        
        <PostStats />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <EngagementChart />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ScheduledPosts />
          </div>
          <div>
            <NotificationsList />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
