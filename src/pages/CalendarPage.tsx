
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

const CalendarPage = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Calendar</h1>
          <p className="text-muted-foreground">
            View and manage your scheduled posts in a calendar view.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Content Calendar</CardTitle>
            <CardDescription>
              See all your scheduled posts in a monthly view
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/20 rounded-lg">
              <Calendar mode="single" className="mx-auto" />
            </div>
            <div className="mt-4 p-4 bg-muted/20 rounded-lg">
              <p className="text-center text-muted-foreground">
                Calendar functionality will display scheduled posts here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
