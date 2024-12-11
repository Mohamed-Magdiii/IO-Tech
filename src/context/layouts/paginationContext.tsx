// PaginationContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '../../models/Posts';
import { PaginationContextType } from '../../models/Pagination';


const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const usePagination = (): PaginationContextType => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};

interface PaginationProviderProps {
  children: ReactNode;
  posts: Post[];
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({ children, posts }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedPosts = (posts: Post[]) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  };

  return (
    <PaginationContext.Provider value={{ currentPage, totalPages, postsPerPage, changePage, getPaginatedPosts }}>
      {children}
    </PaginationContext.Provider>
  );
};
