import '../css/cart.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

/* Retrieve albums checking if they have stock */
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

/* Calculate total price */
function getTotalPrice(products) {
    let totalPrice = 0;

    for (const product of products) {
        const minimumQuantity = Math.min(product.quantity, product.album.stock);
        totalPrice += product.album.price * minimumQuantity;
    }

    return totalPrice;
}

/* Based on the stock, create options available to user */
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

/* Remove album from cart */
function removeAlbum(userLogin, userUpdate, setAlbums, products, id, navigate) {
    const updatedProducts = products.filter(product => product.album.id !== id);
    setAlbums(updatedProducts);
    
    const usercart = updatedProducts.map(obj => {
        return {
          id: obj.album.id,
          quantity: obj.quantity
        };
    });

    userLogin.cart = usercart;
    userUpdate(userLogin);
    navigate("/cart")
}

/* Update album from cart */
function updateAlbumQuantity(userLogin, userUpdate, setAlbums, products, id, newQuantity, navigate) {
    const updatedProducts = products.map((product) => {
      if (product.album.id === id) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
  
    setAlbums(updatedProducts);

    const usercart = updatedProducts.map(obj => {
        return {
          id: obj.album.id,
          quantity: obj.quantity
        };
    });

    userLogin.cart = usercart;
    userUpdate(userLogin);
    navigate("/cart")
}

/* Cart page */
function Cart({ userLogin, userUpdate, albums }){
    const [cartAlbums, setCartAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const albumsPerPage = 2;

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
                            <button onClick={() => alert("No products added to the cart.")} className="proceed-btn">Proceed to payment</button>
                    </div>
                </div>
            </div>
        )
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    /* Choosing which albums to show within the pagination system */
    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = cartAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

    let totalPrice = getTotalPrice(cartAlbums);

    const paymentPage = () => {
        navigate("/cart/payment");
    };

    return (
        <div className="cart-page">
            <div className="layer">
                <div className="cart-container">
                    <div className="title"> Cart </div>
                        <div className="products">
                            {currentAlbums.map((product, index) => (
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
                                        <select value={product.quantity} onChange={(e) => updateAlbumQuantity(userLogin, userUpdate, setCartAlbums, cartAlbums, product.album.id, parseInt(e.target.value), navigate)} className={`qnt${product.album.id}`} id="qnt">
                                            {optionsAvailable(product.album.stock)}
                                        </select>
                                        <br/>
                                        <div className="stock">
                                            ({product.album.stock} in stock)     
                                        </div>
                                    </div>
                                    <div className="remove-cart" onClick={() => removeAlbum(userLogin, userUpdate, setCartAlbums, cartAlbums, product.album.id, navigate)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" className="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                            {/* Pagination system for multiple cart items */}
                            <div className="pagination">
                                {Array.from({ length: Math.ceil(cartAlbums.length / albumsPerPage) }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={currentPage === i + 1 ? "active" : ""}
                                >
                                    {i + 1}
                                </button>
                                ))}
                            </div>
                            <p className="cart-price"> Total: ${totalPrice.toFixed(2)} </p>
                        </div>
                        <button onClick={paymentPage} className="proceed-btn">Proceed to payment</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;