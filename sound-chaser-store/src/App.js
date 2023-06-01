import React from 'react'
import Home from './components/home';
import Store from './components/store';
import Product from './components/product';
import About from './components/about';
import Contact from './components/contact';
import Header from './components/header';
import Login from './components/login';
import Quiz from './components/quiz';
import Register from './components/register';
import Footer from './components/footer';

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
          <Route path="/product/:id" element={<Product />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
        <Footer />
    </BrowserRouter>

      </div>

  );
}

export default App;
