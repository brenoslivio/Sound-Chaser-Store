import '../css/register.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

async function getId() {
    const customers = await fetch("http://localhost:8000/customers", {cache: "reload"})
                            .then(response => response.json());

    const userId = customers.users.slice(-1)[0].id + 1;

    return userId;
}

function createUser(userId, newUser, navigate){
    const name = document.getElementById("register_name").value;
    const email = document.getElementById("register_mail").value;
    const phone = document.getElementById("register_phone").value;
    const password = document.getElementById("register_password").value;
    const confirmPassword = document.getElementById("register_confirm").value;

    let rules = "";

    let userLogin = {id: userId, name: "", email: "", phone: "", password: "", 
                        card: {number: "", holder: "", expiration: "", security: ""},
                        address: {address: "", receiver: ""},
                        orders: [], cart: []};

    if (name.length >= 5 && name.length <= 32) {
        userLogin.name = name;
    } else {
        rules += "Name must be between 5 and 32 characters.\n";
    }

    const phoneRegex = /^\d+$/; // Only digits allowed
    if (phoneRegex.test(phone)) {
        if (phone.length <= 32) {
            userLogin.phone = phone;
        } else {
            rules += "Phone number must be between 1 and 32 digits.\n";
        }
    } else {
        rules += "Invalid phone number. Only digits are allowed.\n";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (emailRegex.test(email)) {
        userLogin.email = email;
    } else {
        rules += "Invalid email address.\n";
    }
    
    if (password.length >= 8 && password.length <= 32) {
        if (password === confirmPassword){
            userLogin.password = password;
        } else {
            rules += "Passwords don't match.\n"
        }
    } else {
        rules += "Password must be between 8 and 32 characters.\n";
    }
    
    if (rules) {
        alert(rules);
    } else {
        newUser(userLogin);
        navigate("/");
        window.scrollTo(0, 0);
    }
}

function Register({ newUser }){

    const [userId, setUserId] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        getId()
        .then(id => {setUserId(id);})
        .catch(error => console.error(error));
    }, []);

    return (
        <div className="register-page">
            <div class="layer">
                <div class="register-container">
                    <div class="title"> Register </div>
                    <div class="icon-register">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </div>
                    
                    <div class="form"> 
                        <div class="tooltip-register">
                            <input type="text" id="register_name" placeholder="Name"/>
                                <span class="tooltiptext">
                                Name between 5 and 32 characters
                                </span>
                        </div>
                        <div class="tooltip-register">
                            <input type="text" id="register_mail" placeholder="E-mail"/>
                                <span class="tooltiptext">
                                Enter a valid e-mail address
                                </span>
                        </div>
                        <div class="tooltip-register">
                            <input type="text" id="register_phone" placeholder="Phone number"/>
                                <span class="tooltiptext">
                                Enter only digits
                                </span>
                        </div>
                        <div class="tooltip-register">
                            <input type="password" id="register_password" placeholder="Password"/>
                                <span class="tooltiptext">
                                Enter a password between 8 and 32 characters
                                </span>
                        </div>
                        <div class="tooltip-register">
                            <input type="password" id="register_confirm" placeholder="Confirm your password"/>
                                <span class="tooltiptext">
                                Enter same password as above
                                </span>
                        </div>
                    
                        <button onClick={() => createUser(userId, newUser, navigate)} id="form-register-btn">Register</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register;