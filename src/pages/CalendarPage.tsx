
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar as CalendarIcon, MessageSquare } from 'lucide-react';

// Sample data for scheduled posts
const scheduledDates = [
  new Date(2025, 3, 8),
  new Date(2025, 3, 15),
  new Date(2025, 3, 22),
  new Date(2025, 3, 28),
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDayPosts, setSelectedDayPosts] = useState<any[]>([]);

  // Function to check if a date has posts scheduled
  const hasPostsScheduled = (date: Date) => {
    return scheduledDates.some(scheduledDate => 
      scheduledDate.getDate() === date.getDate() &&
      scheduledDate.getMonth() === date.getMonth() &&
      scheduledDate.getFullYear() === date.getFullYear()
    );
  };

  // Sample function to get posts for a selected day
  const getPostsForDay = (date: Date) => {
    if (!hasPostsScheduled(date)) return [];
    
    // This would normally fetch from an API
    return [
      { id: 1, time: '09:00 AM', platform: 'Twitter', content: 'Exciting news coming today! Stay tuned for our announcement. #innovation' },
      { id: 2, time: '12:30 PM', platform: 'LinkedIn', content: 'We\'re thrilled to share our latest product update that enhances user experience.' },
      { id: 3, time: '04:00 PM', platform: 'Facebook', content: 'Join us for a live Q&A session with our product team this Friday!' },
    ];
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setSelectedDayPosts(getPostsForDay(newDate));
    } else {
      setSelectedDayPosts([]);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Content Calendar</h1>
          <p className="text-muted-foreground">
            View and manage your scheduled posts in a calendar view.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 card-gradient">
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>
                Schedule and manage your social media content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                <Calendar 
                  mode="single" 
                  selected={date}
                  onSelect={handleDateSelect}
                  className="mx-auto"
                  modifiers={{
                    booked: scheduledDates,
                  }}
                  modifiersStyles={{
                    booked: { 
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(59, 130, 246, 0.15)',
                      color: '#3b82f6',
                      border: '1px solid #3b82f6'  
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>{date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No date selected'}</CardTitle>
              <CardDescription>
                {selectedDayPosts.length > 0 ? `${selectedDayPosts.length} posts scheduled` : 'No posts scheduled for this day'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDayPosts.length > 0 ? (
                <div className="space-y-4">
                  {selectedDayPosts.map(post => (
                    <div key={post.id} className="p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-blue-400" />
                          <span className="text-xs font-medium text-blue-400">{post.time}</span>
                        </div>
                        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-400/20">
                          {post.platform}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        {post.content}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                  <CalendarIcon className="h-8 w-8 mb-2 text-muted-foreground/60" />
                  <h3 className="text-sm font-medium mb-1">No posts scheduled</h3>
                  <p className="text-xs">
                    Select a highlighted date to view scheduled posts or create new ones.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
