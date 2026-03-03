import axiosInstance from './axiosConfig';

export const authAPI = {
  signup: (data) => axiosInstance.post('/users/signup', data),
  signin: (data) => axiosInstance.post('/users/signin', data),
  getProfile: () => axiosInstance.get('/users/profile-data'),
  uploadPhoto: (formData) => axiosInstance.put('/users/upload-photo', formData),
};

export const postsAPI = {
  getFeed: (page = 1) => axiosInstance.get(`/posts?page=${page}`),
  getUserPosts: (userId) => axiosInstance.get(`/users/${userId}/posts`),
  createPost: (formData) => axiosInstance.post('/posts', formData),
  toggleLike: (postId) => axiosInstance.put(`/posts/${postId}/like`),
  deletePost: (postId) => axiosInstance.delete(`/posts/${postId}`), 
};

export const commentsAPI = {
  getComments: (postId) => axiosInstance.get(`/posts/${postId}/comments`),
  addComment: (postId, content) => axiosInstance.post(`/posts/${postId}/comments`, { content }),
  addReply: (postId, commentId, content) => axiosInstance.post(`/posts/${postId}/comments/${commentId}/replies`, { content }),
};

export const notificationsAPI = {
  getAll: () => axiosInstance.get('/notifications'),
};