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
import AdminsCRUD from './components/adminsCRUD';
import ProductsCRUD from './components/productsCRUD';
import UsersCRUD from './components/usersCRUD';

/* Retrieve specific user by id */
async function getUser(id) {
  const user = await fetch("http://localhost:8000/users/" + id, {cache: "reload"})
                            .then(response => response.json());
  if (!user) {
    return;
  }
  
  return user;
}

function App() {
  let local_user = JSON.parse(localStorage.getItem("user"));

  /* State for search bar, user and albums */
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState('');
  const [admin, setAdmin] = useState('');

  /* Retrieving user */
  useEffect(() => {
    if (local_user){
      getUser(local_user.id)
      .then(login => {setUser(login);})
      .catch(error => console.error(error));
    }
  }, []);
  
  /* Handling functions to retrieve variables from other components */
  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleUser = (value) => {
    fetch(`http://localhost:8000/users/${value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('User updated successfully:', data);
        // Handle the updated user data
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        // Handle the error
      });
    localStorage.setItem("user", JSON.stringify(value));
    setUser(value);
  };

  const handleRegister = (value) => {
    fetch(`http://localhost:8000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('User created successfully:', data);
        // Handle the updated user data
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        // Handle the error
      });
    localStorage.setItem("user", JSON.stringify(value));
    setUser(value);
  };

  const handleAdmin = (value) => {
    setUser('');
    setAdmin(value);
  };

  const handleAlbums = (value) => {
    fetch(`http://localhost:8000/albums`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Albums updated successfully:', data);
        // Handle the updated albums data
      })
      .catch((error) => {
        console.error('Error updating albums:', error);
        // Handle the error
      });
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
              <Route path="/" element={<Home userLogin={user} userUpdate={handleUser} />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/register" element={<Register newUser={handleRegister} userLogin={user} />} />
              <Route path="/store" element={<Store searchValue={searchValue} />} />
              <Route path="/product/:id" element={<Product userLogin={user} userUpdate={handleUser} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Cart and payment */}
              <Route path="/cart" element={<Cart userLogin={user} userUpdate={handleUser} />} />
              <Route path="/cart/payment" element={<Payment userLogin={user} userUpdate={handleUser} albumUpdate={handleAlbums}/>} />

              {/* User area */}
              <Route path="/user" element={<UserInformation userLogin={user} signOut={handleSignOut} userUpdate={handleUser}/>} />
              <Route path="/user/payment" element={<UserPayment userLogin={user} signOut={handleSignOut} userUpdate={handleUser}/>} />
              <Route path="/user/orders" element={<UserOrders userLogin={user} signOut={handleSignOut} />} />
              
              {/* Admin area */}
              <Route path="/admin" element={<Admin onLogin={handleAdmin}/>} />
              <Route path="/admin/admins" element={<AdminsCRUD userAdmin={admin} />} />
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
