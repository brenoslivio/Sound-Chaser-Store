import '../css/adminSelection.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

/* Admininistration page */
function AdminSelection({ userAdmin }){

    let navigate = useNavigate(); 
    
    if (!userAdmin) {
        useEffect(() => {
            navigate("/admin");
        });
        return;
    }

    return (
        <div className="administration-page">
            <div class="layer">
                <div class="administration-container">
                    <div class="title"> Administration </div>

                    <button onClick={() => navigate("/admin/admins")} id="admins-btn">Admins</button>
                    <button onClick={() => navigate("/admin/products")} id="products-btn">Products</button>
                    <button onClick={() => navigate("/admin/users")} id="users-btn">Users</button>
                    
                </div>
            </div>
        </div>
    )
}

export default AdminSelection;