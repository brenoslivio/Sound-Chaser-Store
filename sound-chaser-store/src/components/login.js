import '../css/main.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

function Login(){
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = "register"; 
      navigate(path);
    }

    return (
        <div className="login-container">
            <div className="arrow-up"></div>
            <div className="login-form">
                <input type="text" id="login_mail" placeholder="E-mail"/>
                <input type="text" id="login_password" placeholder="Password"/>

                <button id="login-btn">Login</button>
                <div className="register">
                    I don't have an account yet
                </div>

                <button onClick={routeChange} id="register-btn">Register</button>
            </div>
        </div>
    )
}

export default Login;