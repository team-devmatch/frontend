import { useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem('token') || null   // ✅ 새로고침해도 토큰 유지
  )
// localStorage에 token이 있으면
// user = "eyJhbGci..." (토큰 문자열)
// → user가 null이 아니에요!
// → 로그인 상태로 인식해요!

// 그래서 댓글 작성, 글쓰기가 막히지 않아요!

// 백엔드 연동 후 AuthProvider.jsx 이렇게 바꿔요!

// const [user, setUser] = useState(null)

// const login = (token, userInfo) => {
//   localStorage.setItem('token', token)
//   setUser(userInfo)        // ← { nickname, email 등 } 저장
// }

// const logout = () => {
//   localStorage.removeItem('token')
//   setUser(null)
// }

  const login = (token) => {
    localStorage.setItem('token', token)   // ✅ 토큰 저장
    setUser(token)                         // ✅ Context에도 저장
  }

  const logout = () => {
    localStorage.removeItem('token')       // ✅ 토큰 삭제
    setUser(null)                          // ✅ Context 초기화
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
