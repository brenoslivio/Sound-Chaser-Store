import '../css/cart.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Cart({ userLogin }){

    let navigate = useNavigate();

    if (!userLogin) {
        useEffect(() => {
            navigate("/");
        });
        return;
    }

    return (
        <div className="cart-page">
            <div className="layer">
                <div className="cart-container">
                    <div className="title"> Cart </div>
                        <div className="products">
                            {userLogin.cart.slice(0, 2).map((album, index) => (
                                <div className={`cart-product${index + 1}`}>
                                    <div className="album">
                                        <img src={"imgs/albums/2012.png"} alt="2012" />
                                    </div>
                                    <div className="text">
                                        2012 - Rash 
                                    </div>
                                    <div className="product-price">
                                        $49.99/pc
                                    </div>
                                    <div className="quantity">
                                        <select name="qnt" id="qnt">
                                            <option value="1">1</option>
                                        </select>
                                        <br/>
                                        <div className="stock">
                                            (1 in stock)     
                                        </div>
                                    </div>
                                    <div className="remove-cart">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" className="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                            
                            <p className="cart-price"> Total: $99.98 </p>
                        </div>
                        <button  className="proceed-btn">Proceed to payment</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;