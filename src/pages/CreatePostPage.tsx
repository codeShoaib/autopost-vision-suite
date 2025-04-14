
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PostCreate } from '@/components/posts/PostCreate';

const CreatePostPage = () => {
  return (
    <MainLayout>
      <PostCreate />
    </MainLayout>
  );
};

export default CreatePostPage;
