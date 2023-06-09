import '../css/main.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

async function checkLogin(onLogin, navigate, setMessageAlert) {
    const email = document.getElementById('login_mail').value;
    const password = document.getElementById('login_password').value;

    if (!email || !password) { // Handle empty email or password
        setMessageAlert("Please enter both e-mail and password.");
        return;
    }

    try {
        const users = await fetch("http://localhost:8000/users", {cache: "reload"})
                                .then(response => response.json());

        const user = users.find(cust => cust.email === email && cust.password === password);

        if (user) {
            console.log("Login successful");
            onLogin(user); // Set the user
            
            document.getElementsByClassName('login-container')[0].style.display = 'none';
            navigate("/");
        } else {
            setMessageAlert("Invalid email or password.");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

function Login({ onLogin }){
    const [messageAlert, setMessageAlert] = useState("");

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = "register"; 
      navigate(path);
    }

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            checkLogin(onLogin);
        }
    };

    return (
        <div className="login-container">
            <div className="arrow-up"></div>
            <div className="login-form">
                <input type="text" id="login_mail" placeholder="E-mail" onKeyDown={handleKeyPress}/>
                <input type="password" id="login_password" placeholder="Password" onKeyDown={handleKeyPress}/>

                <button onClick={() => checkLogin(onLogin, navigate, setMessageAlert)} id="login-btn">Login</button>
                <div className="register">
                    I don't have an account yet
                </div>

                <button onClick={routeChange} id="register-btn">Register</button>
            </div>
            {messageAlert && (
                    <div className="overlay">
                        <div className="alert-content">
                            <div className="message">{messageAlert}</div>
                            <button onClick={() => setMessageAlert("")}> OK </button>
                        </div>
                </div>
            )}
        </div>
    )
}

export default Login;