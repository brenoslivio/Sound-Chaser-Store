import '../css/register.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

/* Get all registered emails */
async function getAllEmails() {
    const users = await fetch("http://localhost:8000/users", {cache: "reload"})
                            .then(response => response.json());
    
    const emails = users.map(user => user.email);

    return emails;
}

/* Create id for new user based on last added user */
async function getId() {
    const users = await fetch("http://localhost:8000/users", {cache: "reload"})
                            .then(response => response.json());

    const userId = users.slice(-1)[0].id + 1;

    return userId;
}

/* Create new user checking for each input */
function createUser(userId, newUser, navigate, registeredEmails){
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

    if (name.trim().length >= 5 && name.trim().length <= 32) {
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
        const isRegistered = registeredEmails.includes(email);
        if (isRegistered) {
            rules += "Email address is already registered.\n";
        } else {
            userLogin.email = email;
        }
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

/* Register page */
function Register({ newUser, userLogin }){

    const [userId, setUserId] = useState('');
    const [registeredEmails, setRegisteredEmails] = useState([]);
  
    let navigate = useNavigate();

    if (userLogin) {
        useEffect(() => {
            navigate("/");
        });
        return;
    }
  
    useEffect(() => {
      getId()
        .then(id => { setUserId(id); })
        .catch(error => console.error(error));
  
      getAllEmails()
        .then(emails => { setRegisteredEmails(emails); })
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
                    
                        <button onClick={() => createUser(userId, newUser, navigate, registeredEmails)} id="form-register-btn">Register</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register;