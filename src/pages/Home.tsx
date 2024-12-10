import PostList from "../Modules/Posts/PostList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { usePostContext } from "../context/PostContext";


const HomePage: React.FC = () => {

  // Fetch posts data from the mock API


  return (
    <div>
      <Header /> 
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Post List</h2>
        <PostList /> 
      </div>
      <Footer /> {/* Embed Footer Component */}
    </div>
  );
};

export default HomePage;
