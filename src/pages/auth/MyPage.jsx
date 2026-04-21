import styles from './MyPage.module.css'
import { useState } from 'react'

const MyPage = () => {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [profileImg, setProfileImg] = useState(null)

  // 더미 유저 데이터 (나중에 API 연동)
  const user = {
    nickname: '민수',
    email: 'minsoo@example.com',
  }

  const handleImgChange = (e) => {
    const file = e.target.files[0]
    if (file) setProfileImg(URL.createObjectURL(file))
  }

  const handlePwChange = () => {
    // TODO: API 연동
    console.log('비밀번호 변경:', currentPw, newPw)
  }

  const handleWithdraw = () => {
    // TODO: API 연동
    console.log('회원 탈퇴')
    setShowModal(false)
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
              {profileImg
                ? <img src={profileImg} alt="프로필" className={styles.avatarImg} />
                : <span className={styles.avatarDefault}>🌱</span>
              }
              <label className={styles.cameraBtn} htmlFor="profileUpload">📷</label>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImgChange}
              />
            </div>
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
