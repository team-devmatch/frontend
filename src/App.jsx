import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/useAuth'   // ✅ 추가
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import MyPage from './pages/auth/MyPage'
import BoardListPage from './pages/board/BoardListPage'
import BoardDetailPage from './pages/board/BoardDetailPage'
import BoardWritePage from './pages/board/BoardWritePage'
/*import LandingPage from './pages/LandingPage'*/

const PrivateRoute = ({ children }) => {
  const { user } = useAuth()   // ✅ Context에서 가져오기
  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 누구나 접근 가능 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/board" element={<BoardListPage />} />
        <Route path="/board/:id" element={<BoardDetailPage />} />
        
        {/* 로그인 필요 */}
        <Route path="/mypage" element={<PrivateRoute><MyPage /></PrivateRoute>} />
        <Route path="/board/write" element={<PrivateRoute><BoardWritePage /></PrivateRoute>} />
        
        {/* 기본 경로 → 랜딩페이지 (나중에 LandingPage 컴포넌트로 교체) */}
        <Route path="/" element={<Navigate to="/board" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


/* <Route path="/" element={<LandingPage />} /> */ 