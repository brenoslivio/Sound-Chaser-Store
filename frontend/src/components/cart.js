import '../css/cart.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

async function getAlbums(cart) {
    const products = await fetch("http://localhost:8000/albums", {cache: "reload"})
                            .then(response => response.json());

    let albums = [];

    for (const item of cart) {
        const album = products.albums.find((product) => product.id === item.id);

        if (album.stock > 0) {
            albums.push({ album, quantity: item.quantity });
        }
    }

    return albums;
}

function getTotalPrice(products) {
    let totalPrice = 0;

    for (const product of products) {
        const minimumQuantity = Math.min(product.quantity, product.album.stock);
        totalPrice += product.album.price * minimumQuantity;
    }

    return totalPrice;
}

function optionsAvailable(stock){
    const quantityOptions = [];
    const minimumQuantity = Math.min(stock, 5);

    for (let i = 1; i <= minimumQuantity; i++) {
        quantityOptions.push(
            <option value={i}>{i}</option>
        );
    }

    return quantityOptions;
}

function updateAlbumQuantity(products, id) {
    for (let product of products) {
        if (product.album.id === id) {
            var newQuantity = document.getElementsByClassName("qnt" + id)[0].value;

            console.log(newQuantity);
            // Milestone 3 - Update cart
        }
    }
}

function Cart({ userLogin }){
    const [albums, setAlbums] = useState([]);

    let navigate = useNavigate();

    if (!userLogin) {
        useEffect(() => {
            navigate("/");
        });
        return;
    }

    useEffect(() => {
        getAlbums(userLogin.cart)
        .then(products => setAlbums(products))
        .catch(error => console.error(error));
    }, []);

    if (albums.length === 0) {
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

    let totalPrice = getTotalPrice(albums);

    return (
        <div className="cart-page">
            <div className="layer">
                <div className="cart-container">
                    <div className="title"> Cart </div>
                        <div className="products">
                            {albums.slice(0, 2).map((product, index) => (
                                <div className={`cart-product${index + 1}`}>
                                    <Link to={"/product/" + product.album.id} key={index}>
                                        <div className="album">
                                            <img src={product.album.img} alt={product.album.name} />
                                        </div>
                                    </Link>
                                    <div className="text">
                                        {product.album.name} - {product.album.artist} 
                                    </div>
                                    <div className="product-price">
                                        ${product.album.price}/pc
                                    </div>
                                    <div className="quantity">
                                        <select defaultValue={product.quantity} onChange={() => updateAlbumQuantity(albums, product.album.id)} className={`qnt${product.album.id}`} id="qnt">
                                            {optionsAvailable(product.album.stock)}
                                        </select>
                                        <br/>
                                        <div className="stock">
                                            ({product.album.stock} in stock)     
                                        </div>
                                    </div>
                                    <div className="remove-cart">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" className="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                            
                            <p className="cart-price"> Total: ${totalPrice} </p>
                        </div>
                        <button  className="proceed-btn">Proceed to payment</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;