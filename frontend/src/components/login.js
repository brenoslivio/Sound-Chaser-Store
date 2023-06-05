import '../css/main.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

async function checkLogin(onLogin) {
    const email = document.getElementById('login_mail').value;
    const password = document.getElementById('login_password').value;

    if (!email || !password) { // Handle empty email or password
        alert("Please enter both e-mail and password.");
        return;
    }

    const customers = await fetch("http://localhost:8000/customers", {cache: "reload"})
                            .then(response => response.json());
    
    const user = customers.users.find(cust => cust.email === email && cust.password === password);

    if (user) {
        console.log("Login successful");
        onLogin(user); // Set the user
        document.getElementsByClassName('login-container')[0].style.display = 'none';
    } else {
        alert("Invalid email or password.");
    }
}

function Login({ onLogin }){

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

                <button onClick={() => checkLogin(onLogin)} id="login-btn">Login</button>
                <div className="register">
                    I don't have an account yet
                </div>

                <button onClick={routeChange} id="register-btn">Register</button>
            </div>
        </div>
    )
}

export default Login;