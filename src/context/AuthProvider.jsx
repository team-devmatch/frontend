import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { getMe } from '../api/auth'  // ← 경로 맞게 수정해줘요

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  // ✅ 앱 시작 시 토큰 있으면 getMe() 호출해서 유저 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMe()
        .then(res => {
          setUser({
            token,
            nickname: res.data.nickname,
            email: res.data.email,
            profileImage: res.data.profileImage  // ✅ 추가!
          })
        })
        .catch(() => {
          // 토큰 만료 등
          localStorage.removeItem('token')
          localStorage.removeItem('nickname')
          setUser(null)
        })
    }
  }, [])

  const login = (token, nickname) => {
    localStorage.setItem('token', token)
    localStorage.setItem('nickname', nickname)
    // ✅ 로그인 후 getMe() 호출해서 profileImage도 저장
    getMe()
      .then(res => {
        setUser({
          token,
          nickname: res.data.nickname,
          email: res.data.email,
          profileImage: res.data.profileImage  // ✅ 추가!
        })
      })
      .catch(() => {
        setUser({ token, nickname })
      })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('nickname')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
