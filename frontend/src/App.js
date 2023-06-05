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

async function getAlbums() {
  const products = await fetch("http://localhost:8000/albums", {cache: "reload"})
                          .then(response => response.json());

  let sortedAlbums = products.albums.sort((b, a) => {
          return new Date(a.date_added).getTime() - new Date(b.date_added).getTime();
  });
  
  return sortedAlbums;
}

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
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (local_user){
      getUser(local_user.id)
      .then(login => {setUser(login);})
      .catch(error => console.error(error));
    }
    getAlbums()
    .then(products => {setAlbums(products);})
    .catch(error => console.error(error));
  }, []);
  
  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleUser = (value) => {
    localStorage.setItem("user", JSON.stringify(value));
    setUser(value);
  };

  const handleAlbums = (value) => {
    setAlbums(value);
  };

  const handleSignOut = () => {
    localStorage.clear();
    setUser("");
  };

  return (
      <div>
    <BrowserRouter>
        <Header onSearch={handleSearch} userLogin={user} />
        <Login onLogin={handleUser}/>
            <Routes>
              <Route path="/" element={<Home userLogin={user} userUpdate={handleUser} albums={albums}/>} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/register" element={<Register newUser={handleUser}/>} />
              <Route path="/store" element={<Store searchValue={searchValue} albums={albums}/>} />
              <Route path="/product/:id" element={<Product userLogin={user} userUpdate={handleUser} albums={albums}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/cart" element={<Cart userLogin={user} userUpdate={handleUser} albums={albums}/>} />
              <Route path="/cart/payment" element={<Payment userLogin={user} userUpdate={handleUser} albums={albums} albumUpdate={handleAlbums}/>} />

              <Route path="/user" element={<UserInformation userLogin={user} signOut={handleSignOut} userUpdate={handleUser}/>} />
              <Route path="/user/payment" element={<UserPayment userLogin={user} signOut={handleSignOut} userUpdate={handleUser}/>} />
              <Route path="/user/orders" element={<UserOrders userLogin={user} signOut={handleSignOut} />} />
              
            </Routes>
        <Footer />
    </BrowserRouter>

      </div>

  );
}

export default App;
