import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';

import './App.css';

import { PostProvider } from './context/PostContext';
import HomePage from './pages/Home';
import PostForm from './Modules/Posts/PostForm';

const App: React.FC = () => {
  return (

    <PostProvider>
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-post" element={<PostForm />} />
            <Route path="/edit-post/:id" element={<PostForm />} />
        </Routes>

      </Router>
    </PostProvider>
    
  );
};

export default App;
