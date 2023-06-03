import '../css/userAddresses.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function UserAddresses({ userLogin, signOut }){

    let navigate = useNavigate();
    
    if (!userLogin) {
        useEffect(() => {
            navigate("/");
        });
    }

    const handleSignOut = () => {
        navigate("/");
        signOut(true);
    };

    return (
        <div className="useraddresses-page">
            <div className="layer">
                <div className="useraddresses">
                    <div className="container">
                    </div>

                    <button onClick={() => navigate("/user")} className="userinfo-btn">Information</button>

                    <button onClick={() => navigate("/user/orders")} className="orders-btn">Orders</button>

                    <button onClick={() => navigate("/user/payment")} className="payment-btn">Payment methods</button>

                    <button onClick={() => navigate("/user/addresses")} className="addresses-btn">Addresses</button>

                    <button onClick={() => handleSignOut()} className="signout-btn">Sign out</button>

                </div>
            </div>
        </div>
    )
}

export default UserAddresses;