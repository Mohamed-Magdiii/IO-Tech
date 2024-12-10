import React from "react";
import { Post } from "../../models/Posts";
import { usePostContext } from "../../context/PostContext";




const PostList: React.FC= ( ) => {
  const { posts } = usePostContext(); 
  

    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          <p className="font-normal text-gray-700 dark:text-gray-400">{post.body}</p>
        </div>
      ))}
  
    </div>
  );
};

export default PostList;
