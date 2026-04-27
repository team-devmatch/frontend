import "./App.css";
import "./styles/reset.css";
import "./styles/global.css";
import IndexPage from "./pages/IndexPage";
import Header from "./components/common/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FestivalDetailPage from "./pages/FestivalDetailPage";
import ChatBot from "./components/chatbot/ChatBot";
import FestivalListPage from "./pages/FestivalListPage";
import ApiFestivalDetailPage from "./pages/ApiFestivalDetailPage";
import TopButton from "./components/common/TopButton";
import Footer from "./components/common/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/festivals" element={<FestivalListPage />} />
        <Route path="/festivals/:id" element={<FestivalDetailPage />} />
        <Route
          path="/festival-detail/:festivalId"
          element={<ApiFestivalDetailPage />}
        />
      </Routes>
      <Footer />
      <TopButton />
      <ChatBot />
    </BrowserRouter>
  );
}

export default App;
