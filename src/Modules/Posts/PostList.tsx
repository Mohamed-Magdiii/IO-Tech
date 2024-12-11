import React, { useState } from "react";
import { usePostContext } from "../../context/PostContext";
import Pagination from "../../Layouts/Pagination";
import { useNavigate } from "react-router-dom";
import Modal from "../../Layouts/Modals";

const PostList: React.FC = () => {
  const { posts, loading, error, getPaginatedPosts, currentPage, totalPages, changePage, deletePost,  } = usePostContext();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const handleDelete = (id: number) => {
    setPostToDelete(id);
    setIsModalOpen(true)
  };

  const handleUpdate = (id: number) => {
    const postToUpdate = posts.find((post) => post.id === id);
    if (postToUpdate) {
      navigate(`/edit-post/${id}`, { state: { post: postToUpdate } }); 
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  const confirmDelete = () => {
    if (postToDelete !== null) {
      deletePost(postToDelete); 
    }
    setIsModalOpen(false); 
    setPostToDelete(null); 
  };

  const paginatedPosts = getPaginatedPosts(); 

  return (
    <div className="container  space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedPosts.map((post) => (
          <div
            key={post.id}
            className="relative bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-200 rounded-lg shadow-lg p-6 flex flex-col justify-between "
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-white mb-4">{post.title}</h3>
              <p className="text-white text-sm mb-6">{post.body}</p>
            </div>

            <div className="text-center justify-content-center flex gap-4">
              <button
                onClick={() => handleUpdate(post.id)}
                className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="w-full sm:w-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
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
        postTitle={postToDelete ? posts.find(post => post.id === postToDelete)?.title || '' : ''}
      />
    </div>
  );
};



export default PostList