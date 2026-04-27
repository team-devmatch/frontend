import "./App.css";
import "./styles/reset.css";
import "./styles/global.css";
import IndexPage from "./pages/IndexPage";
import Header from "./components/common/Header";
import { Routes } from "react-router-dom";
import ChatBot from './components/chatbot/ChatBot';

function App() {
  return (
    <>
      <Header />
      <IndexPage />
      <ChatBot />
    </>
  );
}

export default App;
