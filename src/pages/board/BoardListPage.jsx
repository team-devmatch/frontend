import styles from './BoardListPage.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '../../api/board'

const BoardListPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('전체')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts().then(setPosts)
  }, [])

  const tabs = ['잡담', '후기']

  const filtered = activeTab === '전체'
    ? posts
    : posts.filter(p => p.category === activeTab)

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
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(prev => prev === tab ? '전체' : tab)}
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
          {filtered.map(post => (
            <div
              key={post.id}
              className={styles.postItem}
              onClick={() => navigate(`/board/${post.id}`)}
            >
              {/* 아바타 */}
              <div className={styles.avatar}>🌱</div>

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
                  {post.images.length > 0 && <span className={styles.imgIcon}>📷</span>}
                </div>
                <div className={styles.postMeta}>
                  조회 {post.views} · 댓글 {post.comments.length}
                </div>
              </div>

              {/* 우측 좋아요 */}
              <div className={styles.likeBox}>
                <span className={styles.likeCount}>♡{post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BoardListPage
