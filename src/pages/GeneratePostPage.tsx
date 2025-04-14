
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PostGenerator } from '@/components/posts/PostGenerator';

const GeneratePostPage = () => {
  return (
    <MainLayout>
      <PostGenerator />
    </MainLayout>
  );
};

export default GeneratePostPage;
