import '../css/payment.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

/* Retrieve albums based if they are properly in stock */
function getAlbums(cart, albums) {
    let cartAlbums = [];

    for (const item of cart) {
        const album = albums.find((product) => product.id === item.id);
        
        if (album && album.stock > 0) {
            cartAlbums.push({ album, quantity: item.quantity });
        }
    }

    return cartAlbums;
}

/* Calculate total price based on cart items */
function getTotalPrice(products) {
    let totalPrice = 0;

    for (const product of products) {
        const minimumQuantity = Math.min(product.quantity, product.album.stock);
        totalPrice += product.album.price * minimumQuantity;
    }

    return totalPrice;
}

/* Empty cart after payment */
function emptyCart(userLogin, userUpdate, navigate, totalPrice, albums, albumUpdate){
    if (!userLogin.address.address || !userLogin.address.receiver || 
        !userLogin.card.number || !userLogin.card.holder || !userLogin.card.expiration){
        alert("Please fill all information related to your address and payment card.");
        return;
    }

    const orderCompleted = {number: userLogin.orders.length ? (userLogin.orders.slice(-1)[0].number + 1) : 0, 
                            date: new Date().toISOString().slice(0, 10), 
                            status: "finished", 
                            total: parseFloat(totalPrice)};

    userLogin.orders.push(orderCompleted);
    
    userLogin.cart.forEach((item) => {
        const albumIndex = albums.findIndex((album) => album.id === item.id);
        if (albumIndex !== -1) {
            if (albums[albumIndex].stock - item.quantity >= 0) {
                albums[albumIndex].stock -= item.quantity;
            } else {
                albums[albumIndex].stock -= Math.min(albums[albumIndex].stock, item.quantity);
            }
        }
    });

    albumUpdate(albums); /* Update albums after emptying */

    userLogin.cart = [];

    userUpdate(userLogin);
    alert("Successful payment!")

    navigate("/");
    window.scrollTo(0, 0);
}

/* Payment page */
function Payment({ userLogin, userUpdate, albums, albumUpdate }){
    const [cartAlbums, setCartAlbums] = useState([]);

    let navigate = useNavigate();

    if (!userLogin) {
        useEffect(() => {
            navigate("/");
        });
        return;
    }

    useEffect(() => {
        setCartAlbums(getAlbums(userLogin.cart, albums));
    }, []);

    if (cartAlbums.length === 0) {
        return (
            <div className="cart-page">
                <div className="layer">
                    <div className="cart-container">
                        <div className="title"> Cart </div>
                            <div className="products">
                            </div>
                            <button  className="proceed-btn">Proceed to payment</button>
                    </div>
                </div>
            </div>
        )
    }

    let totalPrice = getTotalPrice(cartAlbums);

    return (
        <div className="payment-page">
            <div className="layer">
                <div className="payment-container">
                    <div className="title"> Payment </div>
                        <div className="payment-info">
                            <p className="address-title"> My address </p>
                            <div className="payment-address">
                                <p className="payment-text"><b>Address</b>: {userLogin.address.address}</p>
                                <p className="payment-text"><b>Receiver</b>: {userLogin.address.receiver}</p>
                            </div>
                            <p className="payment-title"> My payment method </p>
                            <div className="payment-card">
                                <p className="payment-text"><b>Card number</b>: {userLogin.card.number ? (`Finishing in ${userLogin.card.number.slice(-4)}`) : ("")}</p>
                                <p className="payment-text"><b>Holder</b>: {userLogin.card.holder}</p>
                                <p className="payment-text"><b>Expiration date</b>: {userLogin.card.expiration ? (new Date(userLogin.card.expiration).toLocaleDateString("en-US", {month: "2-digit", year: "2-digit"})) : ("")}</p>
                            </div>
                            <Link to="/user/payment">
                                <p className="change-payment"> Change address or payment method </p>
                            </Link>
                        </div>
                        <p className="payment-price"> Total: ${totalPrice.toFixed(2)} </p>
                        <button onClick={() => emptyCart(userLogin, userUpdate, navigate, totalPrice.toFixed(2), albums, albumUpdate)} className="buy-btn">Buy</button>
                </div>
            </div>
        </div>
    )
}

export default Payment;