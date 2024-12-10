import React from 'react';
import './App.css';
import { PostProvider } from './context/PostContext';
import HomePage from './pages/Home';

const App: React.FC = () => {
  return (
    <PostProvider>
      <div className="App">
        <HomePage />
      </div>
    </PostProvider>
  );
};

export default App;
