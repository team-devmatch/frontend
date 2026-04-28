import styles from './BoardWritePage.module.css'
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPostById, createPost, updatePost } from '../../api/board'

const BASE_URL = import.meta.env.VITE_API_BASE_URL  // ✅ 추가

const BoardWritePage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')

  const [category, setCategory] = useState('잡담')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (editId) {
      getPostById(editId).then(data => {
        if (data) {
          setCategory(data.category)
          setTitle(data.title)
          setContent(data.content)
          if (data.imageUrl) {
            setImage({ file: null, preview: `${BASE_URL}${data.imageUrl}` })  // ✅ 수정
          }
        }
      })
    }
  }, [editId])

  const handleImgAdd = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage({
      file,
      preview: URL.createObjectURL(file)
    })
  }

  const handleImgRemove = () => {
    setImage(null)
  }

  const handleSubmit = async () => {
    if (!title.trim()) return alert('제목을 입력해주세요.')
    if (!content.trim()) return alert('내용을 입력해주세요.')

    const formData = new FormData()
    formData.append('category', category)
    formData.append('title', title)
    formData.append('content', content)
    if (image?.file) {
      formData.append('image', image.file)
    }

    if (editId) {
      await updatePost(editId, formData)
    } else {
      await createPost(formData)
    }

    navigate('/board')
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h2 className={styles.title}>{editId ? '글 수정' : '글쓰기'}</h2>

        <div className={styles.card}>

          {/* 말머리 탭 */}
          <div className={styles.field}>
            <label className={styles.label}>말머리</label>
            <div className={styles.tabs}>
              {['잡담', '후기'].map(tab => (
                <button
                  key={tab}
                  className={`
                    ${styles.tab}
                    ${category === tab ? styles.tabActive : ''}
                    ${tab === '잡담' ? styles.tabJabdam : styles.tabHugi}
                  `}
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

            {!image && (
              <>
                <label className={styles.imgUploadBox} htmlFor="imgUpload">
                  📎 클릭하여 사진을 첨부하세요 (1장)
                </label>
                <input
                  id="imgUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImgAdd}
                />
              </>
            )}

            {image && (
              <div className={styles.previewList}>
                <div className={styles.previewItem}>
                  <img
                    src={image.preview}
                    alt="첨부이미지"
                    className={styles.previewImg}
                  />
                  <button
                    className={styles.removeBtn}
                    onClick={handleImgRemove}
                  >
                    ×
                  </button>
                </div>
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
