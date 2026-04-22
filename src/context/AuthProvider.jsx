import { useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem('token') || null   // ✅ 새로고침해도 토큰 유지
  )

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
