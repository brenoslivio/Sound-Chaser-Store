import '../css/userInformation.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function updateInformation(userLogin, userUpdate, navigate){
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let rules = "";
    let updated = false;

    if (name.length > 0) {
        if (name.length >= 5 && name.length <= 32) {
            userLogin.name = name;
            updated = true;
        } else {
            rules += "Name must be between 5 and 32 characters.\n";
        }
    }

    if (phone.length > 0) {
        const phoneRegex = /^\d+$/; // Only digits allowed
        if (phoneRegex.test(phone)) {
            if (phone.length <= 32) {
                userLogin.phone = phone;
                updated = true;
            } else {
                rules += "Phone number must be between 1 and 32 digits.\n";
            }
        } else {
            rules += "Invalid phone number. Only digits are allowed.\n";
        }
    }

    if (email.length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
        if (emailRegex.test(email)) {
            userLogin.email = email;
            updated = true;
        } else {
            rules += "Invalid email address.\n";
        }
    }

    if (currentPassword.length > 0) {
        if (currentPassword === userLogin.password) {
            if (newPassword.length > 8 && newPassword.length < 32) {
                if (newPassword === confirmPassword){
                    userLogin.password = newPassword;
                    updated = true;
                } else {
                    rules += "Passwords don't match.\n"
                }
            } else {
                rules += "New password must be between 8 and 32 characters.\n";
            }
        } else {
            rules += "Wrong current password.\n";
        }
    }

    if (rules) {
        alert(rules);
    } 

    if (updated) {
        userUpdate(userLogin);
        alert("Information updated.")
        navigate("/user");
    } else {
        alert("No information was updated.")
    }

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}

function UserInformation({ userLogin, signOut, userUpdate }){

    let navigate = useNavigate();

    if (!userLogin) {
        useEffect(() => {
            navigate("/");
        });
        return;
    }

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
                            <input placeholder={userLogin.name} type="text" id="name" name="name" />
                        </div>

                        <div className="input-phone">
                            <label htmlFor="phone">Phone number:</label>
                            <input placeholder={userLogin.phone} type="tel" id="phone" name="phone" />
                        </div>

                        <div className="input-email">
                            <label htmlFor="email">E-mail:</label>
                            <input placeholder={userLogin.email} type="email" id="email" name="email" />
                        </div>

                        <p className="change"> Change password: </p>

                        <div className="input-currentpassword">
                            <label htmlFor="currentPassword">Current password:</label>
                            <input type="password" id="currentPassword" name="currentPassword" />
                        </div>

                        <div className="input-newpassword">
                            <label htmlFor="newPassword">New password:</label>
                            <input type="password" id="newPassword" name="newPassword" />
                        </div>

                        <div className="input-confirmnewpassword">
                            <label htmlFor="confirmPassword">Confirm new password:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" />
                        </div>

                        <button onClick={() => updateInformation(userLogin, userUpdate, navigate)} className="save-btn">Save</button>

                    </div>

                    <button onClick={() => navigate("/user")} className="userinfo-btn">Information</button>

                    <button onClick={() => navigate("/user/orders")} className="orders-btn">Orders</button>

                    <button onClick={() => navigate("/user/payment")} className="payment-btn">Payment and address</button>

                    <button onClick={() => handleSignOut()} className="signout-btn">Sign out</button>

                </div>
            </div>
        </div>
    )
}

export default UserInformation;