import '../css/userOrders.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function UserOrders({ userLogin, signOut}){

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
        <div className="userorders-page">
            <div className="layer">
                <div className="userorders">
                    <div className="container">
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

export default UserOrders;