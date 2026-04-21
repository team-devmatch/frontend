import styles from './BoardWritePage.module.css'
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPostById, createPost, updatePost } from '../../api/board'

const BoardWritePage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit') // 수정 모드면 id 있음, 글쓰기면 null

  const [category, setCategory] = useState('잡담')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState([]) // { file, preview }

  // 수정 모드일 때 기존 데이터 불러오기
  useEffect(() => {
    if (editId) {
      getPostById(editId).then(data => {
        if (data) {
          setCategory(data.category)
          setTitle(data.title)
          setContent(data.content)
          // 기존 이미지는 url만 있으므로 preview로 변환
          setImages(data.images.map(url => ({ file: null, preview: url })))
        }
      })
    }
  }, [editId])

  const handleImgAdd = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages].slice(0, 5)) // 최대 5장
  }

  const handleImgRemove = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!title.trim()) return alert('제목을 입력해주세요.')
    if (!content.trim()) return alert('내용을 입력해주세요.')

    const postData = { category, title, content, images }

    if (editId) {
      await updatePost(editId, postData)
    } else {
      await createPost(postData)
    }

    navigate('/board')
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        {/* 수정 모드면 '글 수정', 아니면 '글쓰기' */}
        <h2 className={styles.title}>{editId ? '글 수정' : '글쓰기'}</h2>

        <div className={styles.card}>

          {/* 말머리 탭 */}
          <div className={styles.field}>
            <label className={styles.label}>말머리</label>
            <div className={styles.tabs}>
              {['잡담', '후기'].map(tab => (
                <button
                  key={tab}
                  className={`${styles.tab} ${category === tab ? styles.tabActive : ''}`}
                  onClick={() => setCategory(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 제목 */}
          <div className={styles.field}>
            <label className={styles.label}>제목</label>
            <input
              className={styles.input}
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 내용 */}
          <div className={styles.field}>
            <label className={styles.label}>내용</label>
            <textarea
              className={styles.textarea}
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* 사진 첨부 */}
          <div className={styles.field}>
            <label className={styles.label}>사진 첨부</label>
            <label className={styles.imgUploadBox} htmlFor="imgUpload">
              📎 클릭하여 사진을 첨부하세요 (최대 5장)
            </label>
            <input
              id="imgUpload"
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleImgAdd}
            />

            {/* 썸네일 미리보기 */}
            {images.length > 0 && (
              <div className={styles.previewList}>
                {images.map((img, i) => (
                  <div key={i} className={styles.previewItem}>
                    <img src={img.preview} alt={`첨부${i+1}`} className={styles.previewImg} />
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleImgRemove(i)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 등록하기 / 수정하기 버튼 */}
          <button className={styles.submitBtn} onClick={handleSubmit}>
            {editId ? '수정하기' : '등록하기'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default BoardWritePage
