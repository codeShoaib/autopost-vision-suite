
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  scheduledFor?: Date;
  platforms: ('twitter' | 'linkedin' | 'facebook')[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  createdAt: Date;
}

interface PostState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'createdAt'>) => string;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  getScheduledPosts: () => Post[];
  getPostById: (id: string) => Post | undefined;
}

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      posts: [],
      
      addPost: (post) => {
        const id = Math.random().toString(36).substring(2, 15);
        set((state) => ({
          posts: [
            ...state.posts,
            {
              ...post,
              id,
              createdAt: new Date(),
            },
          ],
        }));
        return id;
      },
      
      updatePost: (id, updatedPost) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updatedPost } : post
          ),
        }));
      },
      
      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }));
      },
      
      getScheduledPosts: () => {
        return get().posts.filter(
          (post) => post.status === 'scheduled' && post.scheduledFor && post.scheduledFor > new Date()
        );
      },
      
      getPostById: (id) => {
        return get().posts.find((post) => post.id === id);
      },
    }),
    {
      name: 'post-storage',
    }
  )
);

export default usePostStore;
