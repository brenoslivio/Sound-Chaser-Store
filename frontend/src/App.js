import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Admin from './components/admin';
import AdminSelection from './components/adminSelection';
import AdminsCRUD from './components/adminsCRUD';
import ProductsCRUD from './components/productsCRUD';
import UsersCRUD from './components/usersCRUD';

/* Retrieve albums from server */
async function getAlbums() {
  const albums = await fetch("http://localhost:8000/albums", {cache: "reload"})
                          .then(response => response.json());

  return albums;
}

/* Retrieve specific user by id */
async function getUser(id) {
  const user = await fetch("http://localhost:8000/users/" + id, {cache: "reload"})
                            .then(response => response.json());

  return user;
}

function App() {
  
  /* Check for user in local storage (it will be properly implemented in Milestone 3) */
  let local_user = JSON.parse(localStorage.getItem("user"));

  /* State for search bar, user and albums */
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState('');
  const [admin, setAdmin] = useState('');
  const [albums, setAlbums] = useState([]);

  /* Retrieving user and albums */
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
  
  /* Handling functions to retrieve variables from other components */
  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleUser = (value) => {
    if (value.cart.length > 0) {
      // Filter out items that don't exist in albums
      const updatedCart = value.cart.filter(cartItem =>
        albums.some(album => album.id === cartItem.id)
      );
      // Update the user's cart with the filtered items
      value.cart = updatedCart;
    }
    setUser(value);
  };

  const handleAdmin = (value) => {
    setUser('');
    setAdmin(value);
  };

  const handleAlbums = (value) => {
    setAlbums(value);
    // Update in the server - Milestone 3
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
              {/* Main components */}
              <Route path="/" element={<Home userLogin={user} userUpdate={handleUser} albums={albums}/>} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/register" element={<Register newUser={handleUser}/>} />
              <Route path="/store" element={<Store searchValue={searchValue} albums={albums}/>} />
              <Route path="/product/:id" element={<Product userLogin={user} userUpdate={handleUser} albums={albums}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Cart and payment */}
              <Route path="/cart" element={<Cart userLogin={user} userUpdate={handleUser} albums={albums}/>} />
              <Route path="/cart/payment" element={<Payment userLogin={user} userUpdate={handleUser} albums={albums} albumUpdate={handleAlbums}/>} />

              {/* User area */}
              <Route path="/user" element={<UserInformation userLogin={user} signOut={handleSignOut} userUpdate={handleUser}/>} />
              <Route path="/user/payment" element={<UserPayment userLogin={user} signOut={handleSignOut} userUpdate={handleUser}/>} />
              <Route path="/user/orders" element={<UserOrders userLogin={user} signOut={handleSignOut} />} />
              
              {/* Admin area */}
              <Route path="/admin" element={<Admin onLogin={handleAdmin}/>} />
              <Route path="/admin/administration" element={<AdminSelection userAdmin={admin}/>} />
              <Route path="/admin/admins" element={<AdminsCRUD userAdmin={admin}/>} />
              <Route path="/admin/products" element={<ProductsCRUD userAdmin={admin} albumUpdate={handleAlbums}/>} />
              <Route path="/admin/users" element={<UsersCRUD userAdmin={admin}/>} />

              {/* Redirect if page doesn't exist */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        <Footer />
    </BrowserRouter>

      </div>

  );
}

export default App;
