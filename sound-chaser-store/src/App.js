import React from 'react'
import Home from './home';
import Store from './store';
import About from './about';
import Contact from './contact';
import Header from './header';
import Login from './login';
import Quiz from './quiz';
import Register from './register';
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
        <Login />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/quiz" element={<Quiz />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/store" element={<Store />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
        <Footer />
    </BrowserRouter>

      </div>

  );
}

export default App;
