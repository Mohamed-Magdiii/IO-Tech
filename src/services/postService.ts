import api from '../app/api';
import { Post } from '../models/Posts';

const API_URL = '/posts';

const getAllPosts = async () => {
  const response = await api.get(API_URL);  
  return response.data;
};

const addNewPost = async (postData: Post) => {
  const response = await api.post(API_URL, postData);
  return response.data;
};


const postService = {
    getAllPosts,
    addNewPost,
  
};

export default postService;
