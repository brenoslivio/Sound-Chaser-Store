import '../css/cart.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

async function getAlbums(cart) {
    const products = await fetch("http://localhost:8000/albums", {cache: "reload"})
                            .then(response => response.json());

    let albums = [];

    for (const item of cart) {
        const album = products.albums.find((product) => product.id === item.id);
        
        if (album && album.stock > 0) {
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

function removeAlbum(userLogin, userUpdate, setAlbums, products, id) {
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
}

function updateAlbumQuantity(userLogin, userUpdate, setAlbums, products, id, newQuantity) {
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
}

function Cart({ userLogin, userUpdate }){
    const [albums, setAlbums] = useState([]);
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
                            <button onClick={() => alert("No products added to cart.")} className="proceed-btn">Proceed to payment</button>
                    </div>
                </div>
            </div>
        )
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

    let totalPrice = getTotalPrice(albums);

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
                                        <select value={product.quantity} onChange={(e) => updateAlbumQuantity(userLogin, userUpdate, setAlbums, albums, product.album.id, parseInt(e.target.value))} className={`qnt${product.album.id}`} id="qnt">
                                            {optionsAvailable(product.album.stock)}
                                        </select>
                                        <br/>
                                        <div className="stock">
                                            ({product.album.stock} in stock)     
                                        </div>
                                    </div>
                                    <div className="remove-cart" onClick={() => removeAlbum(userLogin, userUpdate, setAlbums, albums, product.album.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" className="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                            <div className="pagination">
                                {Array.from({ length: Math.ceil(albums.length / albumsPerPage) }, (_, i) => (
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