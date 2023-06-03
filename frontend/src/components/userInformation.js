import '../css/userInformation.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function UserInformation({ userLogin, signOut }){

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

                        <button onClick={() => console.log("Save changes")} className="save-btn">Save</button>

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