import '../css/productsCRUD.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

/* Retrieve albums from server */
async function getAlbums() {
    const albums = await fetch("http://localhost:8000/albums", {cache: "reload"})
                            .then(response => response.json());

    return albums;
}

/* Admininistration page */
function ProductsCRUD({ admin }){

    const [products, setProducts] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    const [showRemoveOverlay, setShowRemoveOverlay] = useState(false);
    const [showCreateOverlay, setShowCreateOverlay] = useState(false);
    const [password, setPassword] = useState('');
    const [productIdToRemove, setProductIdToRemove] = useState(null);

    const [showEditOverlay, setShowEditOverlay] = useState(false);

    let navigate = useNavigate();
    
    if (!admin) {
        useEffect(() => {
            navigate("/");
        });
        return;
    }

    useEffect(() => {
        getAlbums()
        .then(albums => {setProducts(albums)})
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            const overlayContent = document.querySelector('.overlay-content');
            if (overlayContent && !overlayContent.contains(e.target)) {
                setShowRemoveOverlay(false);
                setShowCreateOverlay(false);
                setShowEditOverlay(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showRemoveOverlay, showCreateOverlay, showEditOverlay]);

    if (products.length === 0) {
        return (
            <div className="productsCRUD-page">
            <div class="layer">
                <div class="productsCRUD-container">
                    <div class="title"> Administration </div>

                    <div className="container">
                        
                    </div>
                </div>
            </div>
        </div>
        )
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRemoveProductClick = (productId) => {
        setProductIdToRemove(productId);
        setShowRemoveOverlay(true);
    };

    const handleCreateProductClick = () => {
        setShowCreateOverlay(true);
    };

    const handleEditProductClick = (album) => {
        setShowEditOverlay(true);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRemoveProductSubmit = () => {

        if (admin.password === password) {
            const updatedProducts = products.filter((album) => album.id !== productIdToRemove);
            setProducts(updatedProducts);
            setShowRemoveOverlay(false);
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    /* Choosing which products to show within the pagination system */
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="productsCRUD-page">
            <div class="layer">
                <div class="productsCRUD-container">
                    <div class="title"> Administration </div>

                    <div className="container">
                        <div class="administration-text"> Products </div>
                        {currentProducts.map((album, index) => (
                            <div className={`product-${index + 1}`}>
                                <div className="text" onClick={() => handleEditProductClick(album.id)}>
                                    id: {album.id}, name: {album.name}, artist: {album.name} 
                                </div>
                                <div className="remove-product" onClick={() => handleRemoveProductClick(album.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg"fill="#72366f" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </div>
                            </div>
                        ))}
                        <div className="create-product-button" onClick={handleCreateProductClick} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </div>
                        {/* Pagination system for multiple products */}
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
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
  

                </div>
            </div>
            {showRemoveOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Remove Product</h2>
                        <p>Are you sure you want to remove this product?</p>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className="button-group">
                            <button onClick={handleRemoveProductSubmit}>Confirm</button>
                            <button onClick={() => setShowRemoveOverlay(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showCreateOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Create Product</h2>

                    </div>
                </div>
            )}
            {showEditOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Edit Product</h2>

                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductsCRUD;