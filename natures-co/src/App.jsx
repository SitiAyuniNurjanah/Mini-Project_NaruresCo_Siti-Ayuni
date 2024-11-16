import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePages from './pages/HomePages';
import About from "./pages/About";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/about" element={<About/>}/>
      </Routes>
    </Router>
  )
}

export default App;