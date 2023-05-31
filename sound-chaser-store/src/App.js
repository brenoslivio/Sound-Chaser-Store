import React from 'react'
import Home from './home';
import Header from './header';
import Footer from './footer';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
      <div>
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          
        </Routes>
        <Footer />
    </BrowserRouter>

      </div>

  );
}

export default App;
