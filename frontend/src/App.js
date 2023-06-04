import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Cart from './components/cart';
import Payment from './components/payment';
import Quiz from './components/quiz';
import Register from './components/register';
import Footer from './components/footer';

async function getUser(id) {
  const customers = await fetch("http://localhost:8000/customers", {cache: "reload"})
                          .then(response => response.json());
  
  const user = customers.users.find(cust => cust.id === id);

  return user;
}

function App() {
  const [searchValue, setSearchValue] = useState('');

  let local_user = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (local_user){
      getUser(local_user.id)
      .then(login => {setUser(login); setCartCount(login.cart.length)})
      .catch(error => console.error(error));
    }
  }, []);
  
  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleUser = (value) => {
    localStorage.setItem("user", JSON.stringify(value));
    setUser(value);
    setCartCount(value.cart.length);
  };

  const handleSignOut = () => {
    localStorage.clear();
    setUser("");
  };

  const handleUserUpdate = (value) => {
    setUser(value);
    setCartCount(value.cart.length);
  };

  return (
      <div>
    <BrowserRouter>
        <Header onSearch={handleSearch} userLogin={user} cartCount={cartCount}/>
        <Login onLogin={handleUser}/>
            <Routes>
              <Route path="/" element={<Home userLogin={user} userUpdate={handleUserUpdate} />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/register" element={<Register />} />
              <Route path="/store" element={<Store searchValue={searchValue} />} />
              <Route path="/product/:id" element={<Product userLogin={user} userUpdate={handleUserUpdate} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/cart" element={<Cart userLogin={user} userUpdate={handleUserUpdate}/>} />
              <Route path="/cart/payment" element={<Payment userLogin={user} userUpdate={handleUserUpdate}/>} />

              <Route path="/user" element={<UserInformation userLogin={user} signOut={handleSignOut} />} />
              <Route path="/user/orders" element={<UserOrders userLogin={user} signOut={handleSignOut} />} />
              <Route path="/user/payment" element={<UserPayment userLogin={user} signOut={handleSignOut} />} />
            </Routes>
        <Footer />
    </BrowserRouter>

      </div>

  );
}

export default App;
