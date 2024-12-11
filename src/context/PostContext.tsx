// PostContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post } from '../models/Posts';
import { PaginationProvider } from './layouts/paginationContext';  
import postService from '../services/postService';
interface PostContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (newPost: Post) => void;
  updatePost: (id: number, updatedPost: Post) => void;
  deletePost: (id: number) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePostContext = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await postService.getAllPosts();
        setPosts(response);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts, newPost];
      return updatedPosts;
    });
  };

  const updatePost = (id: number, updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? updatedPost : post))
    );
  };

  const deletePost = (id: number) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.filter((post) => post.id !== id);
      return updatedPosts;
    });
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        addPost,
        updatePost,
        deletePost,
      }}
    >
      <PaginationProvider posts={posts}>{children}</PaginationProvider>
    </PostContext.Provider>
  );
};
