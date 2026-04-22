import "./App.css";
import "./styles/reset.css";
import "./styles/global.css";
import IndexPage from "./pages/IndexPage";
import Header from "./components/common/Header";
import { Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <IndexPage />
    </>
  );
}

export default App;
