import styles from './BoardDetailPage.module.css'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import {
  getPostById,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  toggleLike,
} from '../../api/board'


const BoardDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [post, setPost] = useState(null)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [editCommentId, setEditCommentId] = useState(null)
  const [editCommentText, setEditCommentText] = useState('')
  const [selectedImgIndex, setSelectedImgIndex] = useState(null)

  useEffect(() => {
    getPostById(id).then(data => {
      if (data) {
        setPost(data)
        setLikeCount(data.likes)
        setComments(data.comments)
      }
    })
  }, [id])

  if (!post) return <div className={styles.wrap}>게시글을 찾을 수 없습니다.</div>

  const handleLike = async () => {
    const res = await toggleLike(post.id, liked)
    if (res.success) {
      setLiked(!liked)
      setLikeCount(prev => liked ? prev - 1 : prev + 1)
    }
  }

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return
    const newComment = await createComment(post.id, {
      id: Date.now(),
      nickname: user?.nickname ?? '익명',
      content: comment,
      time: '방금 전',
      isOwner: true,
    })
    setComments(prev => [...prev, newComment])
    setComment('')
  }

  const handleCommentDelete = async (commentId) => {
    const res = await deleteComment(post.id, commentId)
    if (res.success) {
      setComments(prev => prev.filter(c => c.id !== commentId))
    }
  }

  const handleCommentEditStart = (c) => {
    setEditCommentId(c.id)
    setEditCommentText(c.content)
  }

  const handleCommentEditDone = async (commentId) => {
    if (!editCommentText.trim()) return
    const updated = await updateComment(post.id, commentId, { content: editCommentText })
    setComments(prev => prev.map(c =>
      c.id === commentId ? { ...c, content: updated.content } : c
    ))
    setEditCommentId(null)
    setEditCommentText('')
  }

  const handlePostDelete = async () => {
    const res = await deletePost(post.id)
    if (res.success) navigate('/board')
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

          {/* 말머리 + 제목 */}
          <div className={styles.postHeader}>
            <span className={`${styles.tag} ${post.category === '잡담' ? styles.tagPink : styles.tagPurple}`}>
              {post.category}
            </span>
            <h3 className={styles.postTitle}>{post.title}</h3>
          </div>

          {/* 작성자 정보 */}
          <div className={styles.metaRow}>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>🌱</div>
              <span className={styles.nickname}>{post.nickname}</span>
              <span className={styles.date}>{post.date}</span>
              <span className={styles.views}>조회 {post.views}</span>
            </div>
            {/* 본인 글일 때만 수정/삭제 */}
            {post.isOwner && (
              <div className={styles.ownerBtns}>
                <button
                  className={styles.editBtn}
                  onClick={() => navigate(`/board/write?edit=${post.id}`)}
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
          {post.images.length > 0 && (
            <div className={styles.imageList}>
              {post.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`첨부${i+1}`}
                  className={styles.postImg}
                  style={{ cursor: 'pointer' }}   // ✅ 커서 포인터
                  onClick={() => setSelectedImgIndex(i)}  // ✅ 클릭 시 모달 열기
                />
              ))}
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
              <div className={styles.avatar}>🌱</div>
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
              <div key={c.id} className={styles.commentItem}>
                <div className={styles.avatar}>🌱</div>
                <div className={styles.commentBody}>
                  <div className={styles.commentTop}>
                    <span className={styles.commentNickname}>{c.nickname}</span>
                    <span className={styles.commentTime}>{c.time}</span>
                    {/* 본인 댓글일 때만 수정/삭제 */}
                    {c.isOwner && (
                      <div className={styles.commentBtns}>
                        <button
                          className={styles.commentEditBtn}
                          onClick={() => handleCommentEditStart(c)}
                        >
                          수정
                        </button>
                        <button
                          className={styles.commentDeleteBtn}
                          onClick={() => handleCommentDelete(c.id)}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                  {editCommentId === c.id ? (
                    <div className={styles.commentEditRow}>
                      <input
                        className={styles.commentInput}
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCommentEditDone(c.id)}
                      />
                      <button
                        className={styles.commentSubmitBtn}
                        onClick={() => handleCommentEditDone(c.id)}
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
          {/* ✅ 이미지 확대 모달 */}
          {selectedImgIndex !== null && (
            <div
              className={styles.imgModalOverlay}
              onClick={() => setSelectedImgIndex(null)}  // 바깥 클릭 시 닫기
            >
              <div
                className={styles.imgModal}
                onClick={(e) => e.stopPropagation()}  // 모달 안 클릭 시 닫기 방지
              >
                {/* 닫기 버튼 */}
                <button
                  className={styles.imgModalClose}
                  onClick={() => setSelectedImgIndex(null)}
                >
                  ✕
                </button>

                {/* 이미지 */}
                <img
                  src={post.images[selectedImgIndex]}
                  alt="확대 이미지"
                  className={styles.imgModalImg}
                />

                {/* 이전/다음 버튼 - 이미지 2장 이상일 때만 */}
                {post.images.length > 1 && (
                  <div className={styles.imgModalNav}>
                    <button
                      className={styles.imgModalNavBtn}
                      onClick={() => setSelectedImgIndex(prev =>
                        prev === 0 ? post.images.length - 1 : prev - 1
                      )}
                    >
                      ◀
                    </button>
                    <span className={styles.imgModalCount}>
                      {selectedImgIndex + 1} / {post.images.length}
                    </span>
                    <button
                      className={styles.imgModalNavBtn}
                      onClick={() => setSelectedImgIndex(prev =>
                        prev === post.images.length - 1 ? 0 : prev + 1
                      )}
                    >
                      ▶
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>

  )
}

export default BoardDetailPage
