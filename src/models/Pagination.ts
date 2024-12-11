import { Post } from "./Posts";

export interface PaginationContextType {
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  changePage: (page: number) => void;
  getPaginatedPosts: (posts: Post[]) => Post[];
}