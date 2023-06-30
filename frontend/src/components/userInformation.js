import '../css/userInformation.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

/* Get all registered emails */
async function getAllEmails() {
    const users = await fetch("http://localhost:8000/users", {cache: "reload"})
                            .then(response => response.json());
    
    const emails = users.map(user => user.email);

    return emails;
}

/* Update user information based on allowed inputs */
function updateInformation(userLogin, userUpdate, navigate, registeredEmails, setMessageAlert){
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let updated = false;

    if (name.trim().length > 0) {
        if (name.trim().length >= 5 && name.trim().length <= 32) {
            userLogin.name = name;
            updated = true;
        } else {
            setMessageAlert("Name must be between 5 and 32 characters.");
            return;
        }
    }

    if (phone.length > 0) {
        const phoneRegex = /^\d+$/; // Only digits allowed
        if (phoneRegex.test(phone)) {
            if (phone.length <= 32) {
                userLogin.phone = phone;
                updated = true;
            } else {
                setMessageAlert("Phone number must be between 1 and 32 digits.");
                return;
            }
        } else {
            setMessageAlert("Invalid phone number. Only digits are allowed.");
            return;
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (email.length > 0) {
        if (emailRegex.test(email)) {
            const isRegistered = registeredEmails.includes(email);
            if (isRegistered) {
                setMessageAlert("Email address is already registered.");
                return;
            } else {
                userLogin.email = email;
            }
        } else {
            setMessageAlert("Invalid email address.");
            return;
        }
    }

    if (currentPassword.length > 0) {
        if (currentPassword === userLogin.password) {
            if (newPassword.length >= 8 && newPassword.length <= 32) {
                if (newPassword === confirmPassword){
                    userLogin.password = newPassword;
                    updated = true;
                } else {
                    setMessageAlert("Passwords don't match.");
                    return;
                }
            } else {
                setMessageAlert("New password must be between 8 and 32 characters.");
                return;
            }
        } else {
            setMessageAlert("Wrong current password.");
            return;
        }
    }

    if (updated) {
        userUpdate(userLogin);
        setMessageAlert("Information updated.")
        navigate("/user");
    }
}

/* Page for user change information */
function UserInformation({ userLogin, signOut, userUpdate }){
    const [messageAlert, setMessageAlert] = useState("");
    const [registeredEmails, setRegisteredEmails] = useState([]);

    let navigate = useNavigate();

    if (!userLogin) {
        useEffect(() => {
            navigate("/");
        });
        return;
    }

    useEffect(() => {
        getAllEmails()
          .then(emails => { setRegisteredEmails(emails); })
          .catch(error => console.error(error));
    }, []);

    const handleSignOut = () => {
        navigate("/");
        window.scrollTo(0, 0);
        signOut();
    };

    return (
        <div className="userinfo-page">
            <div className="layer">
                <div className="userinfo">
                    <div className="container">
                        <div className="input-name">
                            <label htmlFor="name">Name:</label>
                            <div class="tooltip-info">
                                <input placeholder={userLogin.name} type="text" id="name" name="name" />
                                    <span class="tooltiptext">
                                    Enter name between 5 and 32 characters
                                    </span>
                            </div>
                        </div>

                        <div className="input-phone">
                            <label htmlFor="phone">Phone number:</label>
                            <div class="tooltip-info">
                                <input placeholder={userLogin.phone} type="tel" id="phone" name="phone" />
                                    <span class="tooltiptext">
                                    Enter only digits
                                    </span>
                            </div>
                        </div>

                        <div className="input-email">
                            <label htmlFor="email">E-mail:</label>
                            <div class="tooltip-info">
                                <input placeholder={userLogin.email} type="email" id="email" name="email" />
                                    <span class="tooltiptext">
                                    Enter a valid e-mail address
                                    </span>
                            </div>
                            
                        </div>

                        <p className="change"> Change password: </p>

                        <div className="input-currentpassword">
                            <label htmlFor="currentPassword">Current password:</label>
                            <div class="tooltip-info">
                                <input type="password" id="currentPassword" name="currentPassword" />
                                    <span class="tooltiptext">
                                    Enter current password
                                    </span>
                            </div>
                            
                        </div>

                        <div className="input-newpassword">
                            <label htmlFor="newPassword">New password:</label>
                            <div class="tooltip-info">
                                <input type="password" id="newPassword" name="newPassword" />
                                    <span class="tooltiptext">
                                    Enter a password between 8 and 32 characters
                                    </span>
                            </div>
                        </div>

                        <div className="input-confirmnewpassword">
                            <label htmlFor="confirmPassword">Confirm new password:</label>
                            <div class="tooltip-info">
                                <input type="password" id="confirmPassword" name="confirmPassword" />
                                    <span class="tooltiptext">
                                    Enter same password as before
                                    </span>
                            </div>
                        </div>

                        <button onClick={() => updateInformation(userLogin, userUpdate, navigate, registeredEmails, setMessageAlert)} className="save-btn">Save</button>

                    </div>

                    <button onClick={() => navigate("/user")} className="userinfo-btn">Information</button>

                    <button onClick={() => navigate("/user/orders")} className="orders-btn">Orders</button>

                    <button onClick={() => navigate("/user/payment")} className="payment-btn">Payment and address</button>

                    <button onClick={() => handleSignOut()} className="signout-btn">Sign out</button>

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

export default UserInformation;