import styles from './BoardDetailPage.module.css'
import { useState, useEffect, useRef } from 'react' 
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import {
  getPostById,
  getComments,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  toggleLike,
} from '../../api/board'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const getProfileImageUrl = (profileImage) => {
  if (!profileImage) return null
  if (profileImage.startsWith('http')) return profileImage
  if (profileImage.startsWith('/uploads')) return `${BASE_URL}${profileImage}`
  return `${BASE_URL}/uploads/user/${profileImage}`
}

const BoardDetailPage = () => {
  const { id } = useParams()
  const hasViewed = useRef(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  const [post, setPost] = useState(null)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [editCommentId, setEditCommentId] = useState(null)
  const [editCommentText, setEditCommentText] = useState('')
  const [imgModalOpen, setImgModalOpen] = useState(false)

  useEffect(() => {
    if (hasViewed.current) return
    hasViewed.current = true 

    getPostById(id).then(data => {
      if (data) {
        setPost(data)
        setLikeCount(data.likeCount)
        setLiked(data.liked)
      }
    })

    getComments(id).then(data => {
      const sorted = (data || []).sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      )
      setComments(sorted)
    })
  }, [id])

  if (!post) return <div className={styles.wrap}>게시글을 찾을 수 없습니다.</div>

  const isOwner = user?.nickname === post.nickname

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
    })
  }

  const handleLike = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    await toggleLike(post.postId)
    setLiked(prev => !prev)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const handleCommentSubmit = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    if (!comment.trim()) return
    const newComment = await createComment(post.postId, { content: comment })
    setComments(prev => [...prev, newComment])
    setComment('')
  }

  const handleCommentDelete = async (commentId) => {
    await deleteComment(post.postId, commentId)
    setComments(prev => prev.filter(c => c.commentId !== commentId))
  }

  const handleCommentEditStart = (c) => {
    setEditCommentId(c.commentId)
    setEditCommentText(c.content)
  }

  const handleCommentEditDone = async (commentId) => {
    if (!editCommentText.trim()) return
    const updated = await updateComment(post.postId, commentId, { content: editCommentText })
    setComments(prev => prev.map(c =>
      c.commentId === commentId ? { ...c, content: updated.content } : c
    ))
    setEditCommentId(null)
    setEditCommentText('')
  }

  const handlePostDelete = async () => {
    await deletePost(post.postId)
    navigate('/board')
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h2
          className={styles.pageTitle}
          onClick={() => navigate('/board')}
          style={{ cursor: 'pointer' }}
        >
          게시판
        </h2>

        <div className={styles.card}>
          <div className={styles.postHeader}>
            <span className={`${styles.tag} ${post.category === '잡담' ? styles.tagPink : styles.tagPurple}`}>
              {post.category}
            </span>
            <h3 className={styles.postTitle}>{post.title}</h3>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>
                {post.profileImage
                  ? <img
                      src={getProfileImageUrl(post.profileImage)}
                      alt="프로필"
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerText = '🌱' }}
                    />
                  : '🌱'}
              </div>
              <span className={styles.nickname}>{post.nickname}</span>
              <span className={styles.date}>{formatDate(post.createdAt)}</span>
              <span className={styles.views}>조회 {post.viewCount}</span>
            </div>
            {isOwner && (
              <div className={styles.ownerBtns}>
                <button
                  className={styles.editBtn}
                  onClick={() => navigate(`/board/write?edit=${post.postId}`)}
                >
                  수정
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={handlePostDelete}
                >
                  삭제
                </button>
              </div>
            )}
          </div>

          <div className={styles.divider} />


          {/* 본문 */}
          <p className={styles.content}>{post.content}</p>

          {/* 첨부 이미지 */}
          {post.imageUrl && (
            <div className={styles.imageList}>
              <img
                src={`${BASE_URL}${post.imageUrl}`}
                alt="첨부이미지"
                className={styles.postImg}
                style={{ cursor: 'pointer' }}
                onClick={() => setImgModalOpen(true)}
              />
            </div>
          )}

          {/* 좋아요 */}
          <div className={styles.likeRow}>
            <button
              className={`${styles.likeBtn} ${liked ? styles.likeBtnActive : ''}`}
              onClick={handleLike}
            >
              {liked ? '❤️' : '🤍'} 좋아요 {likeCount}
            </button>
          </div>

          <div className={styles.divider} />

          {/* 댓글 */}
          <div className={styles.commentSection}>
            <p className={styles.commentCount}>댓글 {comments.length}</p>

            {/* 댓글 입력 */}
            <div className={styles.commentInputRow}>
              <div className={styles.avatar}>
                {user?.profileImage
                  ? <img
                      src={getProfileImageUrl(user.profileImage)}
                      alt="프로필"
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerText = '🌱' }}
                    />
                  : '🌱'}
              </div>
              <input
                className={styles.commentInput}
                placeholder="댓글을 입력하세요..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
              />
              <button className={styles.commentSubmitBtn} onClick={handleCommentSubmit}>
                등록
              </button>
            </div>

            {/* 댓글 없을 때 */}
            {comments.length === 0 && (
              <p className={styles.noComment}>아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
            )}

            {/* 댓글 리스트 */}
            {comments.map(c => (
              <div key={c.commentId} className={styles.commentItem}>
                <div className={styles.avatar}>
                  {c.profileImage
                    ? <img
                        src={getProfileImageUrl(c.profileImage)}
                        alt="프로필"
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerText = '🌱' }}
                      />
                    : '🌱'}
                </div>

                <div className={styles.commentBody}>
                  <div className={styles.commentTop}>
                    <span className={styles.commentNickname}>{c.nickname}</span>
                    <span className={styles.commentTime}>{formatDate(c.createdAt)}</span>
                    {user?.nickname === c.nickname && (
                      <div className={styles.commentBtns}>
                        <button
                          className={styles.commentEditBtn}
                          onClick={() => handleCommentEditStart(c)}
                        >
                          수정
                        </button>
                        <button
                          className={styles.commentDeleteBtn}
                          onClick={() => handleCommentDelete(c.commentId)}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                  {editCommentId === c.commentId ? (
                    <div className={styles.commentEditRow}>
                      <input
                        className={styles.commentInput}
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCommentEditDone(c.commentId)}
                      />
                      <button
                        className={styles.commentSubmitBtn}
                        onClick={() => handleCommentEditDone(c.commentId)}
                      >
                        완료
                      </button>
                      <button
                        className={styles.commentCancelBtn}
                        onClick={() => setEditCommentId(null)}
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <p className={styles.commentContent}>{c.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 이미지 확대 모달 */}
          {imgModalOpen && (
            <div
              className={styles.imgModalOverlay}
              onClick={() => setImgModalOpen(false)}
            >
              <div
                className={styles.imgModal}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.imgModalClose}
                  onClick={() => setImgModalOpen(false)}
                >
                  ✕
                </button>
                <img
                  src={`${BASE_URL}${post.imageUrl}`}
                  alt="확대 이미지"
                  className={styles.imgModalImg}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default BoardDetailPage
