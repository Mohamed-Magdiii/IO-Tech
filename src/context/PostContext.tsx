import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post } from '../models/Posts';
import api from '../app/api';  // mock API

interface PostContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (newPost: Post) => void;
  updatePost: (id: number, updatedPost: Post) => void;
  deletePost: (id: number) => void;
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
  postsPerPage: number;
  getPaginatedPosts: () => Post[];
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  // Dynamically calculate the total pages based on the posts length
  const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/posts'); // Assume this is a mock API
        setPosts(response.data);  // Set posts when fetched
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);  // Only fetch once on component mount

  useEffect(() => {
    // Recalculate pagination whenever posts change
    setCurrentPage(1); // Reset to page 1 on posts change
  }, [posts]);  // Triggered when posts are added/updated/deleted

  const getPaginatedPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts, newPost];
      return updatedPosts; // Add post and trigger re-render
    });
  };

  const updatePost = (id: number, updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? updatedPost : post)) // Update post in state
    );
  };

  const deletePost = (id: number) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.filter((post) => post.id !== id); // Remove post
      return updatedPosts;  // Trigger re-render with updated posts
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
        currentPage,
        totalPages,
        changePage,
        postsPerPage,
        getPaginatedPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
