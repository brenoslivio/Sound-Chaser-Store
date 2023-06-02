import '../css/userPayment.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

function UserPayment({ userLogin }){

    let navigate = useNavigate(); 

    return (
        <div className="userpayment-page">
            <div className="layer">
                <div className="userpayment">
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

export default UserPayment;