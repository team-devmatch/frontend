import styles from './BoardListPage.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '../../api/board'

const LIMIT = 5

const BoardListPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('전체')
  const [allPosts, setAllPosts] = useState([]) // 전체 데이터 보관
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getPosts().then(({ posts }) => {
      setAllPosts(posts)
    })
  }, [])

  const tabs = ['잡담', '후기']

  // 프론트에서 직접 필터링
  const filteredPosts = activeTab === '전체'
    ? allPosts
    : allPosts.filter(post => post.category === activeTab)

  const totalPages = Math.ceil(filteredPosts.length / LIMIT)

  // 현재 페이지 데이터
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * LIMIT,
    currentPage * LIMIT
  )

  const handleTabClick = (tab) => {
    setActiveTab(prev => prev === tab ? '전체' : tab)
    setCurrentPage(1)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h2
          className={styles.title}
          onClick={() => navigate('/board')}
          style={{ cursor: 'pointer' }}
        >
          게시판
        </h2>

        {/* 탭 + 글쓰기 버튼 */}
        <div className={styles.tabRow}>
          <div className={styles.tabs}>
            {tabs.map(tab => (
              <button
                key={tab}
                className={`
                  ${styles.tab}
                  ${activeTab === tab ? styles.tabActive : ''}
                  ${tab === '잡담' ? styles.tabJabdam : styles.tabHugi}
                `}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            className={styles.writeBtn}
            onClick={() => navigate('/board/write')}
          >
            + 글쓰기
          </button>
        </div>

        {/* 게시글 리스트 */}
        <div className={styles.listCard}>
          {pagedPosts.length === 0 && (
            <div className={styles.empty}>게시글이 없습니다.</div>
          )}
          {pagedPosts.map(post => (
            <div
              key={post.postId}
              className={styles.postItem}
              onClick={() => navigate(`/board/${post.postId}`)}
            >
              {/* 아바타 */}
              <div className={styles.avatar}>
                {post.profileImage
                  ? <img
                      src={post.profileImage}
                      alt="프로필"
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentNode.innerText = '🌱'
                      }}
                    />
                  : '🌱'}
              </div>


              {/* 내용 */}
              <div className={styles.postContent}>
                <div className={styles.postTop}>
                  <span className={styles.nickname}>{post.nickname}</span>
                  <span className={`${styles.tag} ${post.category === '잡담' ? styles.tagPink : styles.tagPurple}`}>
                    {post.category}
                  </span>
                </div>
                <div className={styles.postTitle}>
                  {post.title}
                  {post.imageUrl && <span className={styles.imgIcon}>📷</span>}
                </div>
                <div className={styles.postMeta}>
                  조회 {post.viewCount} · 댓글 {post.commentCount}
                </div>
              </div>

              {/* 우측 좋아요 */}
              <div className={styles.likeBox}>
                <span className={styles.likeCount}>♡ {post.likeCount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
            >
              〈
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              〉
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BoardListPage
