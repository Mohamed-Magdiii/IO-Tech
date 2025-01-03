import React, { useEffect, useState } from "react";
import { usePostContext } from "../../context/PostContext";
import Pagination from "../../Layouts/Pagination";
import Modal from "../../Layouts/Modals";
import { useNavigate } from "react-router-dom";
import { Post } from "../../models/Posts";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { usePagination } from "../../context/layouts/paginationContext";

const PostsPerPage = 6;

const PostList: React.FC = () => {
  const { posts, loading, error, deletePost } = usePostContext();
  const { currentPage, totalPages, changePage } = usePagination();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const sorted = [...posts].sort((a, b) =>
      sortOrder === "asc" ? a.id - b.id : b.id - a.id
    );
    setSortedPosts(sorted);
  }, [posts, sortOrder]);

  const handleDelete = (id: number) => {
    setPostToDelete(id);
    setIsModalOpen(true);
  };

  const handleUpdate = (id: number) => {
    const postToUpdate = posts.find((post) => post.id === id);
    if (postToUpdate) {
      navigate(`/edit-post/${id}`, { state: { post: postToUpdate } });
    }
  };

  const confirmDelete = () => {
    if (postToDelete !== null) {
      deletePost(postToDelete);
    }
    setIsModalOpen(false);
    setPostToDelete(null);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * PostsPerPage,
    currentPage * PostsPerPage
  );

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <div className=" space-y-2 container">
      <div>
        <button
          onClick={() => handleSortChange("asc")}
          className={`px-2 py-1 text-xs font-medium rounded-md ${
            sortOrder === "asc" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          <AiOutlineArrowUp />
        </button>
        <button
          onClick={() => handleSortChange("desc")}
          className={`ml-2 px-2 py-1 text-xs font-medium rounded-md ${
            sortOrder === "desc" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          <AiOutlineArrowDown />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {paginatedPosts.map((post) => (
          <div
            key={post.id}
            className="relative  bg-gradient-to-r from-gray-600  to-gray-300 rounded-lg shadow-lg p-4 flex flex-col justify-between text-sm"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-md text-white-800 mb-2">
                {post.title}
              </h3>
              <p className="text-white-400 text-sm text-xs mb-4">{post.body}</p>
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleUpdate(post.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        postTitle={
          postToDelete
            ? posts.find((post) => post.id === postToDelete)?.title || ""
            : ""
        }
      />
    </div>
  );
};

export default PostList;
