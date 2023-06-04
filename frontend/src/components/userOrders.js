import '../css/userOrders.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function UserOrders({ userLogin, signOut }){
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;

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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastOrder= currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = userLogin.orders.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
        <div className="userorders-page">
            <div className="layer">
                <div className="userorders">
                    <div className="container">
                        <p className="orders-title"> My orders: </p>
                        <p className="text-order-number"> Order number </p>
                        <p className="text-order-date"> Date </p>
                        <p className="text-order-status"> Payment status </p>
                        <p className="text-order-total"> Total </p>

                        {currentOrders.map((order, index) => (
                            <div className={`order-record${index + 1}`}>
                                <div className="order-number">
                                    #{order.number.toString().padStart(4, '0')} 
                                </div>
                                <div className="order-date">
                                    {order.date}
                                </div>
                                <div className="order-status">
                                    {order.status}
                                </div>
                                <div className="order-total">
                                    ${order.total}
                                </div>
                            </div>
                        ))}
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(userLogin.orders.length / ordersPerPage) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={currentPage === i + 1 ? "active" : ""}
                            >
                                {i + 1}
                            </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={() => navigate("/user")} className="userinfo-btn">Information</button>

                    <button onClick={() => navigate("/user/orders")} className="orders-btn">Orders</button>

                    <button onClick={() => navigate("/user/payment")} className="payment-btn">Payment and address</button>

                    <button onClick={() => handleSignOut()} className="signout-btn">Sign out</button>

                </div>
            </div>
        </div>
    )
}

export default UserOrders;