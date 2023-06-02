import '../css/userInformation.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

function UserInformation({ userLogin }){

    let navigate = useNavigate(); 

    return (
        <div className="userinfo-page">
            <div className="layer">
                <div className="userinfo">
                    <div className="container">
                    </div>

                    <button onClick={() => navigate("/user")} className="userinfo-btn">Information</button>

                    <button onClick={() => navigate("/user/orders")} className="orders-btn">Orders</button>

                    <button onClick={() => navigate("/user/payment")} className="payment-btn">Payment methods</button>

                    <button onClick={() => navigate("/user/addresses")} className="addresses-btn">Addresses</button>

                    <button className="signout-btn">Sign out</button>

                </div>
            </div>
        </div>
    )
}

export default UserInformation;