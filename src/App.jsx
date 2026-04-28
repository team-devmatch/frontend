import "./App.css";
import "./styles/reset.css";
import "./styles/global.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";

// 공통 컴포넌트
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import TopButton from "./components/common/TopButton";
import ChatBot from "./components/chatbot/ChatBot";

// 페이지
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import MyPage from "./pages/auth/MyPage";

import BoardListPage from "./pages/board/BoardListPage";
import BoardDetailPage from "./pages/board/BoardDetailPage";
import BoardWritePage from "./pages/board/BoardWritePage";

import FestivalListPage from "./pages/FestivalListPage";
import FestivalDetailPage from "./pages/FestivalDetailPage";
import ApiFestivalDetailPage from "./pages/ApiFestivalDetailPage";

// 로그인 보호 라우트
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* 누구나 접근 가능 */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 축제 */}
        <Route path="/festivals" element={<FestivalListPage />} />
        <Route path="/festivals/:id" element={<FestivalDetailPage />} />
        <Route path="/festival-detail/:festivalId" element={<ApiFestivalDetailPage />} />

        {/* 게시판 */}
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
      <Footer />
      <TopButton />
      <ChatBot />
    </BrowserRouter>
  );
}

export default App;
