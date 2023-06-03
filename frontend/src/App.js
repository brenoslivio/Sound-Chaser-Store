import React, { useState } from 'react';
import Home from './components/home';
import Store from './components/store';
import Product from './components/product';
import About from './components/about';
import Contact from './components/contact';
import Header from './components/header';
import Login from './components/login';
import UserInformation from './components/userInformation';
import UserOrders from './components/userOrders';
import UserPayment from './components/userPayment';
import UserAddresses from './components/userAddresses';
import Cart from './components/cart';
import Quiz from './components/quiz';
import Register from './components/register';
import Footer from './components/footer';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleUser = (value) => {
    setUser(value);
  };

  const handleSignOut = () => {
    setUser("");
  };

  return (
      <div>
    <BrowserRouter>
        <Header onSearch={handleSearch} userLogin={user}/>
        <Login onLogin={handleUser}/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/register" element={<Register />} />
              <Route path="/store" element={<Store searchValue={searchValue} />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/cart" element={<Cart userLogin={user} />} />

              <Route path="/user" element={<UserInformation userLogin={user} signOut={handleSignOut} />} />
              <Route path="/user/orders" element={<UserOrders userLogin={user} signOut={handleSignOut} />} />
              <Route path="/user/payment" element={<UserPayment userLogin={user} signOut={handleSignOut} />} />
              <Route path="/user/addresses" element={<UserAddresses userLogin={user} signOut={handleSignOut} />} />
            </Routes>
        <Footer />
    </BrowserRouter>

      </div>

  );
}

export default App;
