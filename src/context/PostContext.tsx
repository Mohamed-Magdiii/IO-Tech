import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {  Post } from '../models/Posts';
import api from '../app/api';

interface PostContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (newPost: Omit<Post, 'id'>) => void;
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


  const getAllPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/posts');
      const data = await response.data;
      setPosts(data);
      
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []); 

  const addPost = async (newPost: Omit<Post, 'id'>) => {
    try {
      const response = await api.post('/posts', newPost);
      const data = await response.data;
      setPosts((prevPosts) => [...prevPosts, data]);
    } catch (err) {
      setError('Failed to add post');
    }
  };

  return (
    <PostContext.Provider value={{ posts, loading, error, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
