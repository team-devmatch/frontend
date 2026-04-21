import { DUMMY_POSTS } from '../data/dummyPosts'

// 게시글 전체 조회
export const getPosts = async () => {
  return DUMMY_POSTS
}

// 게시글 단건 조회
export const getPostById = async (id) => {
  return DUMMY_POSTS.find(p => p.id === Number(id)) || null
}

// 게시글 작성
export const createPost = async (postData) => {
  return { ...postData, id: Date.now() }
}

// 게시글 수정
export const updatePost = async (id, postData) => {
  return { ...postData, id: Number(id) }
}

// 게시글 삭제
export const deletePost = async (id) => {
  return { success: true, id: Number(id) }
}

// 댓글 작성
export const createComment = async (postId, commentData) => {
  return { ...commentData, id: Date.now() }
}

// 댓글 수정
export const updateComment = async (postId, commentId, commentData) => {
  return { ...commentData, id: commentId }
}

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  return { success: true, id: commentId }
}

// 좋아요 토글
export const toggleLike = async (postId, liked) => {
  return { success: true, liked: !liked }
}