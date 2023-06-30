import '../css/payment.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

/* Retrieve albums */
async function getAlbums() {
    const albums = await fetch("http://localhost:8000/albums", {cache: "reload"})
                    .then(response => response.json());

    return albums;
}

/* Retrieve albums checking if they have stock */
function getCartAlbums(userLogin, albums, userUpdate, navigate, setMessageAlert) {
    let cartAlbums = [];

    // to check if album exists or have stock
    if (userLogin.cart.length > 0) {
        const updatedCart = userLogin.cart.filter(cartItem =>
            albums.some(album => album.id === cartItem.id && album.stock > 0)
        );
        // Update the user's cart with the filtered items
        userLogin.cart = updatedCart;
        userUpdate(userLogin);
        navigate("/cart/payment");

        for (const item of userLogin.cart) {
            const album = albums.find((product) => product.id === item.id);
            
            cartAlbums.push({ album, quantity: item.quantity });
        }
    }

    console.log(cartAlbums);

    if (cartAlbums.length === 0) {
        setMessageAlert("Items out of stock!");
        navigate("/cart");
        return;
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
function emptyCart(userLogin, userUpdate, navigate, totalPrice, albums, albumUpdate, setMessageAlert){
    if (!userLogin.address.address || !userLogin.address.receiver || 
        !userLogin.card.number || !userLogin.card.holder || !userLogin.card.expiration){
        setMessageAlert("Please fill all information related to your address and payment card.");
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
                albums[albumIndex].sold += item.quantity;
            } else {
                albums[albumIndex].stock -= Math.min(albums[albumIndex].stock, item.quantity);
                albums[albumIndex].sold += Math.min(albums[albumIndex].stock, item.quantity);
            }
        }
    });

    albumUpdate(albums); /* Update albums after emptying */
    userLogin.cart = [];

    userUpdate(userLogin);

    setMessageAlert("Successful payment!");
}

/* Payment page */
function Payment({ userLogin, userUpdate, albumUpdate }){
    const [messageAlert, setMessageAlert] = useState("");
    const [albums, setAlbums] = useState([]);
    const [cartAlbums, setCartAlbums] = useState([]);

    let navigate = useNavigate();

    if (!userLogin) {
        useEffect(() => {
            navigate("/");
        });
        return;
    }

    useEffect(() => {
        getAlbums()
        .then(products => {
            setAlbums(products);
            setCartAlbums(getCartAlbums(userLogin, products, userUpdate, navigate, setMessageAlert));
        })
        .catch(error => console.error(error));
    }, []);

    const successPay = () => {
        setMessageAlert("");
        navigate("/");
        window.scrollTo(0, 0);
    };

    if (cartAlbums.length === 0) {
        return (
            <div className="payment-page">
                <div className="layer">
                    <div className="payment-container">
                        <div className="title"> Payment </div>
                            <div className="payment-info">
                            </div>
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
                        <button onClick={() => emptyCart(userLogin, userUpdate, navigate, totalPrice.toFixed(2), albums, albumUpdate, setMessageAlert)} className="buy-btn">Buy</button>
                </div>
            </div>
            {messageAlert && (
                <div className="overlay">
                    <div className="alert-content">
                        <div className="message">{messageAlert}</div>
                            <button onClick={() => 
                                messageAlert === "Successful payment!" ? successPay() : setMessageAlert("")}> OK 
                            </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Payment;