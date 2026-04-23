import { useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {

  // ✅ 현재 : 토큰 + 닉네임 localStorage에서 불러오기
  // 🔄 백엔드 연동 후 : const [user, setUser] = useState(null) 로 바꾸고
  //    앱 시작 시 토큰으로 유저 정보 API 호출해서 불러오기
  //    예시) GET /api/auth/me → { nickname, email, ... } 받아서 setUser
  const [user, setUser] = useState(
    localStorage.getItem('token')
      ? {
          token: localStorage.getItem('token'),
          nickname: localStorage.getItem('nickname') || '사용자'
        }
      : null
  )

  // ✅ 현재 : 토큰 + 닉네임 저장
  // 🔄 백엔드 연동 후 : login(token, userInfo) 형태로 바꾸기
  //    예시) login(response.data.token, response.data.user)
  //    userInfo = { nickname: "오충환", email: "...", ... }
  const login = (token, nickname) => {
    localStorage.setItem('token', token)
    localStorage.setItem('nickname', nickname)
    setUser({ token, nickname })
  }

  // ✅ 현재 : 토큰 + 닉네임 삭제
  // 🔄 백엔드 연동 후 : 서버에 로그아웃 API 호출 추가
  //    예시) POST /api/auth/logout 호출 후 localStorage 삭제
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
