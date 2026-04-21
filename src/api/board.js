import { DUMMY_POSTS } from '../data/dummyPosts'

// 페이지네이션 추가
export const getPosts = async ({ page = 1, limit = 5 } = {}) => {
  const start = (page - 1) * limit
  const end = start + limit
  return {
    posts: DUMMY_POSTS.slice(start, end),
    totalCount: DUMMY_POSTS.length,
  }
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