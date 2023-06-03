import '../css/userPayment.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function UserPayment({ userLogin, signOut }){

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
        <div className="userpayment-page">
            <div className="layer">
                <div className="userpayment">
                    <div className="container">
                        <p className="card-title"> My card: </p>

                        <div className="input-card">
                            <label htmlFor="name">Card number:</label>
                            <input placeholder= {`Finishing in ${userLogin.card.number.slice(-4)}`} type="text" id="card" name="card" />
                        </div>

                        <div className="input-holder">
                            <label htmlFor="holder">Card holder:</label>
                            <input placeholder={userLogin.card.holder} type="text" id="holder" name="holder" />
                        </div>

                        <div className="input-expiration">
                            <label htmlFor="expiration">Expiration date:</label>
                            <input value={userLogin.card.expiration} type="date" id="expiration" name="expiration" />
                        </div>

                        <div className="input-security">
                            <label htmlFor="security">Security code:</label>
                            <input type="password" id="security" name="security" />
                        </div>

                        <p className="address-title"> My address: </p>

                        <div className="input-address">
                            <label htmlFor="address">Address:</label>
                            <textarea id="address" name="address" rows="5" cols="33">
                                {userLogin.address.address}
                            </textarea>
                        </div>

                        <div className="input-receiver">
                            <label htmlFor="receiver">Receiver:</label>
                            <input placeholder={userLogin.address.receiver} type="text" id="receiver" name="receiver" />
                        </div>
                    </div>

                    <button onClick={() => navigate("/user")} className="userinfo-btn">Information</button>

                    <button onClick={() => navigate("/user/orders")} className="orders-btn">Orders</button>

                    <button onClick={() => navigate("/user/payment")} className="payment-btn">Payment and address</button>

                    <button onClick={() => handleSignOut()} className="signout-btn">Sign out</button>

                    <button onClick={() => console.log("Save changes")} className="save-btn">Save</button>

                </div>
            </div>
        </div>
    )
}

export default UserPayment;