import '../css/main.css';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";

let login_form = false;

/* Logic to show login form */
function showLogin(){

    if (login_form === false) {
        document.getElementsByClassName('login-container')[0].style.display = 'none';
        login_form = true;
    }
    
    if (document.getElementsByClassName('login-container')[0].style.display === "none") {
        document.getElementsByClassName('login-container')[0].style.display = "block";
    } else {
        document.getElementsByClassName('login-container')[0].style.display = "none";
    }
}

/* Handling if user clicked outside login form */
function handleMouseUp(e){
    const container = document.getElementsByClassName('login-container')[0];
    const loginButton = document.getElementById("login");
    if (!container.contains(e.target) && !loginButton.contains(e.target)) {
        container.style.display = 'none';
    }
}

/* Header for all pages */
function Header({ onSearch, userLogin }){
    let navigate = useNavigate(); 

    const handleKeyPress = (event) => {
        const value = event.target.value;
        if (value.trim() || value === "") {
            onSearch(value);
            navigate("/store");
        }
    };

    if (!userLogin){
        document.addEventListener('mouseup', handleMouseUp);
    } else {
        document.removeEventListener('mouseup', handleMouseUp);
    }
    
    

    return (
        <div>
            <header>
                <div>
                    <Link to="/"><img src="/imgs/logo.png" alt="Logo"/></Link>
                </div>
                <div>
                    <input type="text" id="search" placeholder="Search..." onChange={handleKeyPress}/>
                </div>
                <div>
                    {userLogin ? (
                        <button onClick={() => navigate("/user")} id="login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFFFFF" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            {userLogin.name}
                        </button>
                    ) : (
                        <button onClick={showLogin} id="login">Login</button>
                    )}

                    {userLogin ? (
                        <Link to="/cart">
                            <svg className="cart" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 
                                6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 
                                2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 
                                8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 
                                4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                            </svg>
                            <div className="items-cart">
                                {userLogin.cart.length}
                            </div>
                        </Link>
                    ) : (
                        <svg className="cart" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 16 16" onClick={showLogin}>
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 
                            6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 
                            2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 
                            8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 
                            4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                        </svg>
                    )}
                    
                </div>
            </header>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/store">Store</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>

        </div>
    )
}

export default Header;