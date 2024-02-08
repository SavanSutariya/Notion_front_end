import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotionPage from "./pages/NotionPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/notion/:notion_id" element={<NotionPage />} />
    </Routes>
  );
}

export default App;
