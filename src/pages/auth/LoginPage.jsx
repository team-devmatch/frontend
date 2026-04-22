import styles from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../assets/festigo_logo.svg'
import { login } from '../../api/auth'   // ← 추가

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')   // ← 추가

  const handleLogin = async () => {
    try {
      const res = await login({ email, password })
      
      // 대소문자 둘 다 대비
      const token = (res.headers['authorization'] || res.headers['Authorization'])
        ?.replace('Bearer ', '')
      
      if (!token) {
        setError('토큰을 받아오지 못했습니다.')
        return
      }
      
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      console.error(err)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <img src={logo} alt="FestiGo" className={styles.logo} />
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
          {error && <p className={styles.error}>{error}</p>}  {/* ← 추가 */}
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
