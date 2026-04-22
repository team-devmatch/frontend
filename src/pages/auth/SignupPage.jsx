import styles from './SignupPage.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../assets/festigo_logo.svg'
import { register } from '../../api/auth'

const SignupPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [nickname, setNickname] = useState('')
  const [profileImg, setProfileImg] = useState(null)       // 미리보기용 URL
  const [profileImgFile, setProfileImgFile] = useState(null) // ← 추가! 실제 파일

  // 중복 확인
  const [emailChecked, setEmailChecked] = useState(false)
  const [emailMsg, setEmailMsg] = useState('')
  const [nicknameChecked, setNicknameChecked] = useState(false)
  const [nicknameMsg, setNicknameMsg] = useState('')

  // 비밀번호 일치 여부
  const passwordMatch = password && passwordCheck && password === passwordCheck
  const passwordNotMatch = password && passwordCheck && password !== passwordCheck

  const handleEmailCheck = async () => {
    if (!email.trim()) {
      setEmailMsg('이메일을 입력해주세요.')
      setEmailChecked(false)
      return
    }
    // TODO: 백엔드 연동 시 여기만 교체
    setEmailChecked(true)
    setEmailMsg('사용 가능한 이메일입니다.')
  }

  const handleNicknameCheck = async () => {
    if (!nickname.trim()) {
      setNicknameMsg('닉네임을 입력해주세요.')
      setNicknameChecked(false)
      return
    }
    // TODO: 백엔드 연동 시 여기만 교체
    setNicknameChecked(true)
    setNicknameMsg('사용 가능한 닉네임입니다.')
  }

  // ← 수정! FormData 방식으로 변경
  const handleSignup = async () => {
    if (!emailChecked) return alert('이메일 중복확인을 해주세요.')
    if (!nicknameChecked) return alert('닉네임 중복확인을 해주세요.')
    if (!passwordMatch) return alert('비밀번호를 확인해주세요.')

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('nickname', nickname)
      if (profileImgFile) {
        formData.append('profileImage', profileImgFile)
      }

      await register(formData)
      alert('회원가입이 완료되었습니다!')
      navigate('/login')
    } catch (err) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.')
      console.error(err)
    }
  }

  // ← 수정! 파일도 따로 저장
  const handleImgChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImg(URL.createObjectURL(file))  // 미리보기
      setProfileImgFile(file)                   // 실제 파일 저장
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <img src={logo} alt="FestiGo" className={styles.logo} />
        </div>
        <div className={styles.form}>

          {/* 프로필 이미지 */}
          <div className={styles.avatarWrap}>
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
            <p className={styles.avatarLabel}>사진 변경</p>
          </div>

          {/* 이메일 */}
          <div className={styles.field}>
            <label className={styles.label}>이메일</label>
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailChecked(false)
                  setEmailMsg('')
                }}
              />
              <button className={styles.checkBtn} onClick={handleEmailCheck}>
                중복 확인
              </button>
            </div>
            {emailMsg && (
              <p className={emailChecked ? styles.feedbackOk : styles.feedbackErr}>
                {emailChecked ? '✅' : '❌'} {emailMsg}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className={styles.field}>
            <label className={styles.label}>비밀번호</label>
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.field}>
            <label className={styles.label}>비밀번호 확인</label>
            <input
              className={`${styles.input} ${passwordNotMatch ? styles.inputError : ''}`}
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            {passwordMatch && (
              <p className={styles.feedbackOk}>✅ 비밀번호가 일치합니다.</p>
            )}
            {passwordNotMatch && (
              <p className={styles.feedbackErr}>❌ 비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          {/* 닉네임 */}
          <div className={styles.field}>
            <label className={styles.label}>닉네임</label>
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                type="text"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value)
                  setNicknameChecked(false)
                  setNicknameMsg('')
                }}
              />
              <button className={styles.checkBtn} onClick={handleNicknameCheck}>
                중복 확인
              </button>
            </div>
            {nicknameMsg && (
              <p className={nicknameChecked ? styles.feedbackOk : styles.feedbackErr}>
                {nicknameChecked ? '✅' : '❌'} {nicknameMsg}
              </p>
            )}
          </div>

          <button className={styles.btn} onClick={handleSignup}>
            가입하기
          </button>
          <p className={styles.link}>
            이미 계정이 있으신가요?{' '}
            <span onClick={() => navigate('/login')}>로그인</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
