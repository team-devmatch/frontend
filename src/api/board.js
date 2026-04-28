import instance from './axios';

// 게시글 목록 조회 - 전체 받아서 프론트에서 처리
export const getPosts = async () => {
  const res = await instance.get('/api/boards');
  return {
    posts: res.data,
    totalCount: res.data.length,
  };
};

// 게시글 단건 조회
export const getPostById = async (id) => {
  const res = await instance.get(`/api/boards/${id}`);
  return res.data;
};

// 게시글 작성 - FormData 전송
export const createPost = async (formData) => {
  const res = await instance.post('/api/boards', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// 게시글 수정 - FormData 전송
export const updatePost = async (id, formData) => {
  const res = await instance.put(`/api/boards/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// 게시글 삭제
export const deletePost = async (id) => {
  const res = await instance.delete(`/api/boards/${id}`);
  return res.data;
};

// 댓글 조회
export const getComments = async (postId) => {
  const res = await instance.get(`/api/boards/${postId}/comments`);
  return res.data;
};

// 댓글 작성
export const createComment = async (postId, commentData) => {
  const res = await instance.post(`/api/boards/${postId}/comments`, commentData);
  return res.data;
};

// 댓글 수정
export const updateComment = async (postId, commentId, commentData) => {
  const res = await instance.put(`/api/boards/comments/${commentId}`, commentData);
  return res.data;
};

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  const res = await instance.delete(`/api/boards/comments/${commentId}`);
  return res.data;
};

// 좋아요 토글
export const toggleLike = async (postId) => {
  const res = await instance.post(`/api/boards/${postId}/like`);
  return res.data;
};
