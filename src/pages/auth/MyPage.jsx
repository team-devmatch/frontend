import styles from './MyPage.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe, updateProfileImage, resetProfileImage, withdraw, updatePassword } from '../../api/auth'
import { useAuth } from '../../context/useAuth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const MyPage = () => {
  const navigate = useNavigate()
  const { logout, setUser: setAuthUser } = useAuth()  // ✅ setUser 추가
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [profileImg, setProfileImg] = useState(null)

  const [user, setUser] = useState({
    nickname: '',
    email: '',
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe()
        setUser(res.data)
        if (res.data.profileImage) {
          setProfileImg(`${BASE_URL}${res.data.profileImage}`)
        }
      } catch (err) {
        console.error(err)
        alert('로그인이 필요합니다.')
        navigate('/login')
      }
    }
    fetchUser()
  }, [])

  // ✅ 프로필 이미지 변경
  const handleImgChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('file', file)
      await updateProfileImage(formData)

      const updated = await getMe()
      setUser(updated.data)
      if (updated.data.profileImage) {
        setProfileImg(`${BASE_URL}${updated.data.profileImage}`)
        // ✅ AuthContext user도 업데이트
        setAuthUser(prev => ({
          ...prev,
          profileImage: updated.data.profileImage
        }))
      }
      alert('프로필 이미지가 변경되었습니다.')
    } catch (err) {
      console.error(err)
      alert('이미지 변경에 실패했습니다.')
    }
  }

    // ✅ 기본 이미지로 변경
    const handleResetImg = async () => {
      try {
        await resetProfileImage()
        const updated = await getMe()
        setUser(updated.data)
        setProfileImg(`${BASE_URL}${updated.data.profileImage}`)
        setAuthUser(prev => ({
          ...prev,
          profileImage: updated.data.profileImage
        }))
        alert('기본 이미지로 변경되었습니다.')
      } catch (err) {
        console.error(err)
        alert('기본 이미지 변경에 실패했습니다.')
      }
    }

  // ✅ 비밀번호 변경
  const handlePwChange = async () => {
    if (!currentPw || !newPw) return alert('비밀번호를 입력해주세요.')
    try {
      await updatePassword({
        currentPassword: currentPw,
        newPassword: newPw
      })
      alert('비밀번호가 변경되었습니다.')
      setCurrentPw('')
      setNewPw('')
    } catch (err) {
      const detail = err.response?.data?.detail
      if (detail) {
        alert(detail)
      } else {
        alert('비밀번호 변경에 실패했습니다.')
      }
      console.error(err)
    }
  }

  // ✅ 회원 탈퇴
  const handleWithdraw = async () => {
    try {
      await withdraw()
      logout()
      setShowModal(false)
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('탈퇴 처리 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h2 className={styles.title}>마이페이지</h2>

        {/* 내 프로필 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>내 프로필</h3>
          <div className={styles.profileBox}>
            <div className={styles.avatar}>
              <img
                src={profileImg}
                alt="프로필"
                className={styles.avatarImg}
              />

              <label className={styles.cameraBtn} htmlFor="profileUpload">📷</label>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImgChange}
              />
            </div>

            {/* ✅ 항상 버튼 표시 */}
            <button className={styles.resetImgBtn} onClick={handleResetImg}>
              기본 이미지로 변경
            </button>

            <p className={styles.profileName}>{user.nickname}</p>
            <p className={styles.profileEmail}>{user.email}</p>
          </div>
        </section>

        {/* 내 정보 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>내 정보</h3>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>이메일</span>
            <span className={styles.infoValue}>{user.email}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>닉네임</span>
            <span className={styles.infoValue}>{user.nickname}</span>
          </div>
        </section>

        <div className={styles.divider} />

        {/* 비밀번호 변경 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>비밀번호 변경</h3>
            <button className={styles.editBtn} onClick={handlePwChange}>
              변경하기 ›
            </button>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>현재 비밀번호</label>
            <input
              className={styles.input}
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>새 비밀번호</label>
            <input
              className={styles.input}
              type="password"
              placeholder="새 비밀번호를 입력하세요"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </div>
        </section>

        {/* 회원 탈퇴 */}
        <section className={styles.withdrawSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.withdrawTitle}>회원 탈퇴</h3>
              <p className={styles.withdrawDesc}>탈퇴 시 모든 정보가 삭제됩니다.</p>
            </div>
            <button className={styles.withdrawBtn} onClick={() => setShowModal(true)}>
              탈퇴하기 ›
            </button>
          </div>
        </section>
      </div>

      {/* 탈퇴 확인 모달 */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalIcon}>⚠️</p>
            <p className={styles.modalTitle}>정말 탈퇴하시겠습니까?</p>
            <p className={styles.modalDesc}>
              탈퇴 시 모든 정보가 삭제됩니다.<br />
              이 작업은 되돌릴 수 없습니다.
            </p>
            <div className={styles.modalBtns}>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                취소
              </button>
              <button className={styles.confirmBtn} onClick={handleWithdraw}>
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyPage
