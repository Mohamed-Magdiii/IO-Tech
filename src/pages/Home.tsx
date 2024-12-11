import PostList from "../Modules/Posts/PostList";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/add-post"); 
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="my-auto mx-auto py-8 px-4">
  <div className="flex justify-end mb-6">
    <button
      onClick={handleCreatePost}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-200"
    >
      Create New Post
    </button>
  </div>

  <PostList />
</div>
      
    </div>
  );
};

export default HomePage;
