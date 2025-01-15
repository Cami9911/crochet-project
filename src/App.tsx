import './App.css'
import { useState } from 'react'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import Home from "./pages/Home.tsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
