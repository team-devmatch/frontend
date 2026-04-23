import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/useAuth'   // ✅ 추가
import Header from './components/common/Header'
import IndexPage from './pages/IndexPage' 
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import MyPage from './pages/auth/MyPage'
import BoardListPage from './pages/board/BoardListPage'
import BoardDetailPage from './pages/board/BoardDetailPage'
import BoardWritePage from './pages/board/BoardWritePage'

import "./styles/reset.css";   // ✅ 추가
import "./styles/global.css";  // ✅ 추가


const PrivateRoute = ({ children }) => {
  const { user } = useAuth()   // ✅ Context에서 가져오기
  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* 누구나 접근 가능 */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/board" element={<BoardListPage />} />

        <Route path="/board/write" element={
          <PrivateRoute><BoardWritePage /></PrivateRoute>
        } />
        <Route path="/board/:id" element={<BoardDetailPage />} />

        {/* 로그인 필요 */}
        <Route path="/mypage" element={
          <PrivateRoute><MyPage /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App