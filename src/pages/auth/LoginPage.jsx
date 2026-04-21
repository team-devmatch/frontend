import styles from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // 나중에 API 연동
    console.log(email, password)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.logo}>🌸 FestiGo</div>
        </div>
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>이메일</label>
            <input
              className={styles.input}
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
          <button className={styles.btn} onClick={handleLogin}>
            로그인
          </button>
          <p className={styles.link}>
            아직 회원이 아니신가요?{' '}
            <span onClick={() => navigate('/signup')}>회원가입</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage