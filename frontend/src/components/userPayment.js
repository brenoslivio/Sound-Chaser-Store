import '../css/userPayment.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

/* Update user payment based on allowed inputs */
function updatePayment(userLogin, userUpdate, navigate){
    const card = document.getElementById("card").value;
    const holder = document.getElementById("holder").value;
    const expiration = document.getElementById("expiration").value;
    const security = document.getElementById("security").value;
    const address = document.getElementById("address").value;
    const receiver = document.getElementById("receiver").value;

    let rules = "";
    let updated = false;

    if (card.length > 0) {
        const cardRegex = /^\d+$/; // Only digits allowed
        if (cardRegex.test(card)) {
            if (card.length >= 8 && card.length <= 16) {
                userLogin.card.number = card;
                updated = true;
            } else {
                rules += "Card number must be between 8 and 16 digits.\n";
            }
        } else {
            rules += "Invalid credit card number. Only digits are allowed.\n";
        }
    }

    if (holder.length > 0) {
        if (holder.length >= 5 && holder.length <= 32) {
            userLogin.card.holder = holder;
            updated = true;
        } else {
            rules += "Holder name must be between 5 and 32 characters.\n";
        }
    }

    if (userLogin.card.expiration !== expiration) {
        if (expiration.length > 0) {
            const d = new Date(expiration);
            d.setMonth(d.getMonth() + 1);
            d.setDate(0);
            userLogin.card.expiration = d.toISOString().slice(0, 10);
            updated = true;
        } else {
            rules += "Invalid date. Choose month and year properly.\n";
        }
    }

    if (security.length > 0) {
        const securityRegex = /^\d+$/; // Only digits allowed
        if (securityRegex.test(security)) {
            if (security.length === 3) {
                userLogin.card.security = security;
                updated = true;
            } else {
                rules += "Security code must be 3 digits.\n";
            }
        } else {
            rules += "Invalid security code. Only digits are allowed.\n";
        }
    }

    if (userLogin.address.address !== address) {
        if (address.length >= 20 && address.length <= 128) {
            userLogin.address.address = address;
            updated = true;
        } else {
            rules += "Address name must be between 20 and 128 characters.\n";
        }
    }

    if (receiver.length > 0) {
        if (receiver.length >= 5 && receiver.length <= 32) {
            userLogin.address.receiver = receiver;
            updated = true;
        } else {
            rules += "Receiver name must be between 5 and 32 characters.\n";
        }
    }

    if (rules) {
        alert(rules);
    } 

    if (updated) {
        userUpdate(userLogin);
        alert("Information updated.")
        navigate("/user/payment");
    } else {
        alert("No information was updated.")
    }
}

/* Page where user can add payment and address information */
function UserPayment({ userLogin, signOut, userUpdate }){

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
                            <div class="tooltip-payment">
                                <input placeholder={userLogin.card.number ? (`Finishing in ${userLogin.card.number.slice(-4)}`) : ("")} type="text" id="card" name="card" />
                                    <span class="tooltiptext">
                                    Enter between 8 and 16 digits
                                    </span>
                            </div>
                        </div>

                        <div className="input-holder">
                            <label htmlFor="holder">Card holder:</label>
                            <div class="tooltip-payment">
                            <input placeholder={userLogin.card.holder} type="text" id="holder" name="holder" />
                                    <span class="tooltiptext">
                                    Name between 5 and 32 characters
                                    </span>
                            </div>
                        </div>

                        <div className="input-expiration">
                            <label htmlFor="expiration">Expiration date:</label>
                            <div class="tooltip-payment">
                            <input defaultValue={userLogin.card.expiration} type="date" id="expiration" name="expiration" />
                                    <span class="tooltiptext">
                                    Enter the last day of month's expiration date
                                    </span>
                            </div>
                        </div>

                        <div className="input-security">
                            <label htmlFor="security">Security code:</label>
                            <div class="tooltip-payment">
                            <input defaultValue={userLogin.card.security} type="password" id="security" name="security" />
                                    <span class="tooltiptext">
                                    Enter security code of 3 digits
                                    </span>
                            </div>
                        </div>

                        <p className="address-title"> My address: </p>

                        <div className="input-address">
                            <label htmlFor="address">Address:</label>
                            <textarea id="address" name="address" rows="5" cols="33" maxlength="128">
                                {userLogin.address.address}
                            </textarea>
                        </div>

                        <div className="input-receiver">
                            <label htmlFor="receiver">Receiver:</label>
                            <div class="tooltip-payment">
                            <input placeholder={userLogin.address.receiver} type="text" id="receiver" name="receiver" />
                                    <span class="tooltiptext">
                                    Name between 5 and 32 characters
                                    </span>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => navigate("/user")} className="userinfo-btn">Information</button>

                    <button onClick={() => navigate("/user/orders")} className="orders-btn">Orders</button>

                    <button onClick={() => navigate("/user/payment")} className="payment-btn">Payment and address</button>

                    <button onClick={() => handleSignOut()} className="signout-btn">Sign out</button>

                    <button onClick={() => updatePayment(userLogin, userUpdate, navigate)} className="save-btn">Save</button>

                </div>
            </div>
        </div>
    )
}

export default UserPayment;