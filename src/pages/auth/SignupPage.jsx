import styles from './SignupPage.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from "../../assets/images/logo.svg"
import { register } from '../../api/auth'
import { RULES, MESSAGES } from '../../constants/validation'

// ✅ 정규식 함수 - RULES에서 참조
const validateEmail = (email) => RULES.email.test(email)
const validatePassword = (pw) => RULES.password.test(pw)
const validateNickname = (nick) => RULES.nickname.test(nick)

const SignupPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [nickname, setNickname] = useState('')
  const [profileImg, setProfileImg] = useState(null)
  const [profileImgFile, setProfileImgFile] = useState(null)

  // 중복 확인
  const [emailChecked, setEmailChecked] = useState(false)
  const [emailMsg, setEmailMsg] = useState('')
  const [nicknameChecked, setNicknameChecked] = useState(false)
  const [nicknameMsg, setNicknameMsg] = useState('')

  // 유효성 메시지
  const [emailFormatMsg, setEmailFormatMsg] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')
  const [nicknameFormatMsg, setNicknameFormatMsg] = useState('')

  // 비밀번호 일치 여부
  const passwordMatch = password && passwordCheck && password === passwordCheck
  const passwordNotMatch = password && passwordCheck && password !== passwordCheck

  // ✅ 이메일 입력 시 형식 검사
  const handleEmailChange = (e) => {
    const val = e.target.value
    setEmail(val)
    setEmailChecked(false)
    setEmailMsg('')
    if (val && !validateEmail(val)) {
      setEmailFormatMsg(MESSAGES.email.format)
    } else {
      setEmailFormatMsg('')
    }
  }

  // ✅ 비밀번호 입력 시 형식 검사
  const handlePasswordChange = (e) => {
    const val = e.target.value
    setPassword(val)
    if (val && !validatePassword(val)) {
      setPasswordMsg(MESSAGES.password.format)
    } else {
      setPasswordMsg('')
    }
  }

  // ✅ 닉네임 입력 시 형식 검사
  const handleNicknameChange = (e) => {
    const val = e.target.value
    setNickname(val)
    setNicknameChecked(false)
    setNicknameMsg('')
    if (val && !validateNickname(val)) {
      setNicknameFormatMsg(MESSAGES.nickname.format)
    } else {
      setNicknameFormatMsg('')
    }
  }

  // ✅ 이메일 중복 확인
  const handleEmailCheck = async () => {
    if (!email.trim()) {
      setEmailMsg(MESSAGES.email.empty)
      setEmailChecked(false)
      return
    }
    if (!validateEmail(email)) {
      setEmailMsg(MESSAGES.email.format)
      setEmailChecked(false)
      return
    }
    // TODO: 백엔드 연동 시 여기만 교체
    setEmailChecked(true)
    setEmailMsg(MESSAGES.email.ok)
  }

  // ✅ 닉네임 중복 확인
  const handleNicknameCheck = async () => {
    if (!nickname.trim()) {
      setNicknameMsg(MESSAGES.nickname.empty)
      setNicknameChecked(false)
      return
    }
    if (!validateNickname(nickname)) {
      setNicknameMsg(MESSAGES.nickname.format)
      setNicknameChecked(false)
      return
    }
    // TODO: 백엔드 연동 시 여기만 교체
    setNicknameChecked(true)
    setNicknameMsg(MESSAGES.nickname.ok)
  }

  // ✅ 회원가입 제출
  const handleSignup = async () => {
    if (!validateEmail(email)) return alert(MESSAGES.email.format)
    if (!emailChecked) return alert(MESSAGES.email.duplicate)
    if (!validatePassword(password)) return alert(MESSAGES.password.format)
    if (!validateNickname(nickname)) return alert(MESSAGES.nickname.format)
    if (!nicknameChecked) return alert(MESSAGES.nickname.duplicate)
    if (!passwordMatch) return alert(MESSAGES.password.notMatch)

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('passwordCheck', passwordCheck)
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

  // ✅ 프로필 이미지 변경
  const handleImgChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImg(URL.createObjectURL(file))
      setProfileImgFile(file)
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
                onChange={handleEmailChange}
              />
              <button className={styles.checkBtn} onClick={handleEmailCheck}>
                중복 확인
              </button>
            </div>
            {/* ✅ 형식 에러 */}
            {emailFormatMsg && !emailChecked && (
              <p className={styles.feedbackErr}>❌ {emailFormatMsg}</p>
            )}
            {/* 중복 확인 결과 */}
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
              onChange={handlePasswordChange}
            />
            {/* ✅ 비밀번호 형식 안내 */}
            {passwordMsg && (
              <p className={styles.feedbackErr}>❌ {passwordMsg}</p>
            )}
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
                onChange={handleNicknameChange}
              />
              <button className={styles.checkBtn} onClick={handleNicknameCheck}>
                중복 확인
              </button>
            </div>
            {/* ✅ 형식 에러 */}
            {nicknameFormatMsg && !nicknameChecked && (
              <p className={styles.feedbackErr}>❌ {nicknameFormatMsg}</p>
            )}
            {/* 중복 확인 결과 */}
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
