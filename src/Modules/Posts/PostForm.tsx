import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostContext } from '../../context/PostContext';
import { Post } from '../../models/Posts';

const PostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addPost, updatePost, posts } = usePostContext();
  const [newPost, setNewPost] = useState<Post>({
    id: 0,
    title: '',
    body: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const postToEdit = posts.find((post) => post.id === parseInt(id, 10));
      if (postToEdit) {
        setNewPost(postToEdit);
      }
    }
  }, [id, posts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updatePost(parseInt(id, 10), newPost);
    } else {
     newPost.id=  posts[posts.length -1].id +1
      await addPost(newPost);
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">{id ? 'Edit Post' : 'Add New Post'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
            <textarea
              name="body"
              value={newPost.body}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              rows={6}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {id ? 'Update Post' : 'Add Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
