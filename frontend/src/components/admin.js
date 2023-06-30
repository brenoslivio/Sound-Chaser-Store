import '../css/admin.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

async function checkLogin(onLogin, navigate, setMessageAlert) {
    const email = document.getElementById('admin_mail').value;
    const password = document.getElementById('admin_password').value;

    if (!email || !password) { // Handle empty email or password
        setMessageAlert("Please enter both e-mail and password.");
        return;
    }

    try {
        const admins = await fetch("http://localhost:8000/admins", {cache: "reload"})
                                .then(response => response.json());

        const admin = admins.find(cust => cust.email === email && cust.password === password);

        if (admin) {
            console.log("Login successful");
            onLogin(admin); // Set the admin
            navigate("/admin/products");
        } else {
            setMessageAlert("Invalid email or password.");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

/* Admin page */
function Admin({ onLogin }){
    const [messageAlert, setMessageAlert] = useState("");
    let navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            setMessageAlert(onLogin, navigate);
        }
    };

    return (
        <div className="admin-page">
            <div class="layer">
                <div class="admin-container">
                    <div class="title"> Admin </div>
                    <div class="icon-admin">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
                        </svg>
                    
                        <input type="text" id="admin_mail" placeholder="E-mail" onKeyDown={handleKeyPress}/>
                        <input type="password" id="admin_password" placeholder="Password" onKeyDown={handleKeyPress}/>
                    
                        <button onClick={() => checkLogin(onLogin, navigate, setMessageAlert)} id="admin-login-btn">Login</button>
                    </div>

                </div>
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

export default Admin;