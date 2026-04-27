import "./App.css";
import "./styles/reset.css";
import "./styles/global.css";
import IndexPage from "./pages/IndexPage";
import Header from "./components/common/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FestivalDetailPage from "./pages/FestivalDetailPage";
import ChatBot from './components/chatbot/ChatBot';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/festivals/:id" element={<FestivalDetailPage />} />
      </Routes>
      <ChatBot />
    </BrowserRouter>
  );
}

export default App;
