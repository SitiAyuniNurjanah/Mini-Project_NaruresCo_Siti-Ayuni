import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePages from './pages/HomePages';
import About from "./pages/About";
import Contact from "./pages/Contact";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/about" element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </Router>
  )
}

export default App;