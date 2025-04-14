
/**
 * Analytics Service for tracking and reporting post performance
 */

// Define analytics data types
export interface PostAnalytics {
  postId: string;
  impressions: number;
  engagements: number;
  clicks: number;
  shares: number;
  likes: number;
  comments: number;
  platform: 'twitter' | 'linkedin' | 'facebook';
  date: string;
}

export interface AnalyticsOverview {
  totalImpressions: number;
  totalEngagements: number;
  engagementRate: number;
  clickThroughRate: number;
  platformBreakdown: {
    platform: string;
    impressions: number;
    engagements: number;
    ctr: number;
  }[];
  recentPosts: {
    id: string;
    content: string;
    platform: string;
    impressions: number;
    engagements: number;
    date: string;
  }[];
}

// Generate mock data for a single post
export function getMockPostAnalytics(postId: string, platform: 'twitter' | 'linkedin' | 'facebook'): PostAnalytics {
  // Platform-specific scaling factors to simulate different performance
  const platformFactors = {
    twitter: { imp: 1.5, eng: 2.0, click: 0.8, share: 2.5, like: 3.0, comment: 1.0 },
    linkedin: { imp: 1.0, eng: 0.7, click: 1.5, share: 0.5, like: 1.0, comment: 2.0 },
    facebook: { imp: 2.0, eng: 1.2, click: 1.0, share: 1.0, like: 2.5, comment: 1.5 }
  };
  
  const factor = platformFactors[platform];
  
  // Base numbers with some randomization
  const baseImpressions = Math.floor(Math.random() * 1000) + 500;
  
  return {
    postId,
    impressions: Math.floor(baseImpressions * factor.imp),
    engagements: Math.floor((baseImpressions * factor.eng * 0.2) * (Math.random() * 0.5 + 0.75)),
    clicks: Math.floor((baseImpressions * factor.click * 0.1) * (Math.random() * 0.5 + 0.75)),
    shares: Math.floor((baseImpressions * factor.share * 0.03) * (Math.random() * 0.5 + 0.75)),
    likes: Math.floor((baseImpressions * factor.like * 0.08) * (Math.random() * 0.5 + 0.75)),
    comments: Math.floor((baseImpressions * factor.comment * 0.02) * (Math.random() * 0.5 + 0.75)),
    platform,
    date: new Date().toISOString()
  };
}

// Get analytics for a specific post
export async function getPostAnalytics(postId: string): Promise<PostAnalytics[]> {
  // This would be a real API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate mock data for each platform
      const twitterAnalytics = getMockPostAnalytics(postId, 'twitter');
      const linkedinAnalytics = getMockPostAnalytics(postId, 'linkedin');
      const facebookAnalytics = getMockPostAnalytics(postId, 'facebook');
      
      resolve([twitterAnalytics, linkedinAnalytics, facebookAnalytics]);
    }, 800);
  });
}

// Get overall analytics summary
export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  // This would be a real API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockPosts = [
        { id: 'post1', content: 'Exciting announcement about our new product launch!', platform: 'twitter' },
        { id: 'post2', content: 'Check out our latest case study on improving customer satisfaction', platform: 'linkedin' },
        { id: 'post3', content: 'Join us for our upcoming webinar on industry trends', platform: 'facebook' },
        { id: 'post4', content: 'We\'re hiring! Check out our open positions', platform: 'linkedin' },
        { id: 'post5', content: 'Customer spotlight: How Company X achieved 200% growth', platform: 'twitter' }
      ];
      
      const recentPostsWithAnalytics = mockPosts.map(post => {
        const analytics = getMockPostAnalytics(post.id, post.platform as any);
        return {
          id: post.id,
          content: post.content,
          platform: post.platform,
          impressions: analytics.impressions,
          engagements: analytics.engagements,
          date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
        };
      });
      
      // Calculate overall metrics
      const totalImpressions = recentPostsWithAnalytics.reduce((sum, post) => sum + post.impressions, 0);
      const totalEngagements = recentPostsWithAnalytics.reduce((sum, post) => sum + post.engagements, 0);
      
      // Group by platform
      const platformGroups = recentPostsWithAnalytics.reduce((groups, post) => {
        const platform = post.platform;
        if (!groups[platform]) {
          groups[platform] = { impressions: 0, engagements: 0 };
        }
        groups[platform].impressions += post.impressions;
        groups[platform].engagements += post.engagements;
        return groups;
      }, {} as Record<string, { impressions: number, engagements: number }>);
      
      // Create platform breakdown
      const platformBreakdown = Object.entries(platformGroups).map(([platform, data]) => ({
        platform,
        impressions: data.impressions,
        engagements: data.engagements,
        ctr: (data.engagements / data.impressions) * 100
      }));
      
      resolve({
        totalImpressions,
        totalEngagements,
        engagementRate: (totalEngagements / totalImpressions) * 100,
        clickThroughRate: (totalEngagements * 0.4 / totalImpressions) * 100,
        platformBreakdown,
        recentPosts: recentPostsWithAnalytics
      });
    }, 1200);
  });
}

export default {
  getPostAnalytics,
  getAnalyticsOverview
};
