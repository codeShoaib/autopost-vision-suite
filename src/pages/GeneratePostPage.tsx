
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PostGenerator } from '@/components/posts/PostGenerator';

const GeneratePostPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="paper-texture rounded-lg p-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">Generate Content</h1>
          <p className="text-muted-foreground">Use AI to create engaging posts for your social media platforms.</p>
        </div>
        
        <div className="glass-dark rounded-lg animate-scale-in">
          <PostGenerator />
        </div>
      </div>
    </MainLayout>
  );
};

export default GeneratePostPage;
