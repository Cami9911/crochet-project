import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainDashboardEntry from "./MainDashboardEntry.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainDashboardEntry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
