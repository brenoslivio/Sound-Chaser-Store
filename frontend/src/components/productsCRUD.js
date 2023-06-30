import '../css/productsCRUD.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* Retrieve albums from server */
async function getAlbums() {
    const albums = await fetch("http://localhost:8000/albums", {cache: "reload"})
                            .then(response => response.json());

    return albums;
}

/* Admininistration page */
function ProductsCRUD({ userAdmin }){

    const [products, setProducts] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    const [showRemoveOverlay, setShowRemoveOverlay] = useState(false);
    const [showCreateOverlay, setShowCreateOverlay] = useState(false);
    const [showEditOverlay, setShowEditOverlay] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cacheBust, setCacheBust] = useState(0);

    const genres = [
        "Classic Rock",
        "Alternative Rock",
        "Progressive Rock",
        "Jazz",
        "Classical Music",
        "Pop",
        "Rap"
    ];

    const imageRef = useRef(null);

    let navigate = useNavigate();
    
    if (!userAdmin) {
        useEffect(() => {
            navigate("/admin");
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

    useEffect(() => {
        if (showEditOverlay) {
            document.getElementById("edit-product-img-preview").src = selectedProduct.img + "?cache=" + (Math.random() * 99999999);
            document.getElementById("edit-product-name").value = selectedProduct.name;
            document.getElementById("edit-product-artist").value = selectedProduct.artist;
            document.getElementById("edit-product-year").value = selectedProduct.year;
            document.getElementById("edit-product-genre").value = selectedProduct.genre;
            document.getElementById("edit-product-description").value = selectedProduct.description;
            document.getElementById("edit-product-price").value = selectedProduct.price;
            document.getElementById("edit-product-stock").value = selectedProduct.stock;
            document.getElementById("edit-product-sold").value = selectedProduct.sold;
            document.getElementById("edit-product-date").value = selectedProduct.date_added;
        }
    }, [showEditOverlay]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRemoveProductClick = (album) => {
        setSelectedProduct(album);
        setShowRemoveOverlay(true);
    };

    const handleCreateProductClick = () => {
        setShowCreateOverlay(true);
    };

    const handleEditProductClick = (album) => {
        setSelectedProduct(album);
        setShowEditOverlay(true);
    };

    const handleRemoveProductSubmit = async () => {
        try {
            await fetch(`http://localhost:8000/albums/${selectedProduct.id}`, {
                method: 'DELETE'
            });
            console.log('Album deleted successfully.');
            // Handle the deleted album data
        
            const updatedProducts = products.filter((album) => album.id !== selectedProduct.id);
            setProducts(updatedProducts);
        
            const lastPageIndex = Math.ceil(updatedProducts.length / 4);
            if (currentPage > lastPageIndex) {
                setCurrentPage(lastPageIndex);
            }
        
            setShowRemoveOverlay(false);
        } catch (error) {
            console.error('Error deleting album:', error);
            // Handle the error
        }
    };

    const handleCreateProductSubmit = async () => {
        const name = document.getElementById('create-product-name').value;
        const artist = document.getElementById('create-product-artist').value;
        const year = document.getElementById('create-product-year').value;
        const genre = document.getElementById('create-product-genre').value;
        const description = document.getElementById('create-product-description').value;
        const price = document.getElementById('create-product-price').value;
        const stock = document.getElementById('create-product-stock').value;
        const sold = document.getElementById('create-product-sold').value;
        const img = document.getElementById('create-product-img-preview').src;
    
        // Validate artist
        if (name.trim().length < 1 || name.trim().length > 30) {
            alert("Album name must be between 1 and 30 characters.");
            return;
        }
        // Validate artist
        if (artist.trim().length < 1 || artist.trim().length > 30) {
            alert("Artist name must be between 1 and 30 characters.");
            return;
        }
        
        // Validate year
        if (!/^\d+$/.test(year)) {
            alert("Year must contain only digits.");
            return;
        }

        if (genre === '') {
            alert("Select a genre.");
            return;
        }

        // Validate description
        if (description.trim().length < 10) {
            alert("Description must be at least 10 characters long.");
            return;
        }

        // Validate price
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            alert("Please enter a valid price.");
            return;
        }

        // Validate stock
        const parsedStock = parseInt(stock);
        if (isNaN(parsedStock) || parsedStock < 0) {
            alert("Please enter a valid stock quantity.");
            return;
        }

        // Validate sold
        const parsedSold = parseInt(sold);
        if (isNaN(parsedSold) || parsedSold < 0) {
            alert("Please enter a valid sold quantity.");
            return;
        }

        // Validate image
        if (img === '') {
            alert('Please enter a valid image.');
            return;
        }

        const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
        const newProduct = {
            id: lastProductId + 1,
            name: name,
            artist: artist,
            year: year,
            genre: genre,
            img: img,
            description: description,
            price: price,
            stock: parsedStock,
            sold: parsedSold,
            date_added: new Date().toISOString().split('T')[0]
        };

        try {
            const response = await fetch(`http://localhost:8000/albums`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
        
            if (!response.ok) {
                throw new Error('Error creating album');
            }

            const data = await response.json();

            console.log('Album created successfully:', data);
            // Handle the created album data

            newProduct.img = data.img_file;

            const updatedProducts = [...products, newProduct];
            setProducts(updatedProducts);
            
            setShowCreateOverlay(false);
        } catch (error) {
            console.error('Error creating album:', error);
            // Handle the error
            return;
        }
        
    };

    const handleEditProductSubmit = async () => {
        const name = document.getElementById('edit-product-name').value;
        const artist = document.getElementById('edit-product-artist').value;
        const year = document.getElementById('edit-product-year').value;
        const genre = document.getElementById('edit-product-genre').value;
        const description = document.getElementById('edit-product-description').value;
        const price = document.getElementById('edit-product-price').value;
        const stock = document.getElementById('edit-product-stock').value;
        const sold = document.getElementById('edit-product-sold').value;
        const img = document.getElementById('edit-product-img-preview').src;
        
        // Validate artist
        if (name.trim().length < 1 || name.trim().length > 30) {
            alert("Album name must be between 1 and 30 characters.");
            return;
        }
        // Validate artist
        if (artist.trim().length < 1 || artist.trim().length > 30) {
            alert("Artist name must be between 1 and 30 characters.");
            return;
        }

        // Validate year
        if (!/^\d+$/.test(year)) {
            alert("Year must contain only digits.");
            return;
        }

        if (genre === '') {
            alert("Select a genre.");
            return;
        }

        // Validate description
        if (description.trim().length < 10) {
            alert("Description must be at least 10 characters long.");
            return;
        }

        // Validate price
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            alert("Please enter a valid price.");
            return;
        }

        // Validate stock
        const parsedStock = parseInt(stock);
        if (isNaN(parsedStock) || parsedStock < 0) {
            alert("Please enter a valid stock quantity.");
            return;
        }

        // Validate sold
        const parsedSold = parseInt(sold);
        if (isNaN(parsedSold) || parsedSold < 0) {
            alert("Please enter a valid sold quantity.");
            return;
        }

        // Validate image
        if (img === '') {
            alert('Please enter a valid image.');
            return;
        }

        const updatedProducts = [...products];
        const index = updatedProducts.findIndex((product) => product.id === selectedProduct.id);

        updatedProducts[index] = {
            ...selectedProduct,
            name: name,
            artist: artist,
            year: year,
            genre: genre,
            description: description,
            price: price,
            stock: parsedStock,
            sold: parsedSold,
            img: img
        };

        try {
            const response = await fetch(`http://localhost:8000/albums/${selectedProduct.id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProducts[index]),
            });
        
            if (!response.ok) {
                throw new Error('Error updating album');
            }

            const data = await response.json();
            console.log('Album updated successfully:', data);
            // Handle the updated album data

            updatedProducts[index].img = data.img_file;
            setCacheBust(cacheBust + 1);

            setProducts(updatedProducts);

            setShowEditOverlay(false);
        } catch (error) {
            console.error('Error updating album:', error);
            // Handle the error
            return;
        }
    };

    /* Choosing which products to show within the pagination system */
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="productsCRUD-page">
            <div className="layer">
                <div className="productsCRUD-container">
                    <div className="title"> Administration </div>
                    {/* Navigation in admin area */}
                    <div className="navigation-buttons">
                        <button onClick={() => navigate("/admin/products")} className="products-btn" >Products</button>
                        <button onClick={() => navigate("/admin/users")} className="users-btn" >Users</button>
                        <button onClick={() => navigate("/admin/admins")} className="admins-btn" >Admins</button>
                    </div>
                    <div className="container">
                        <div className="administration-text"> Products </div>
                        {currentProducts ? (currentProducts.map((album, index) => (
                            <div className={`product-${index + 1}`}>
                                <div className="text">
                                    id: {album.id} &emsp; name: {album.name} &emsp; stock: {album.stock} &emsp; sold: {album.sold}
                                </div>
                                <div className="remove-product" onClick={() => handleRemoveProductClick(album)}>
                                    <svg xmlns="http://www.w3.org/2000/svg"fill="#72366f" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </div>
                                <div className="edit-product" onClick={() => handleEditProductClick(album)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#72366f" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </div>
                            </div>
                            
                        ))) : null}
                        <div className="create-product-button" onClick={handleCreateProductClick} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" className="bi bi-plus" viewBox="0 0 16 16">
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
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                id="create-product-img"
                                ref={imageRef}
                                onChange={() => {
                                    const file = imageRef.current.files[0];
                                    const imgPreview = document.getElementById('create-product-img-preview');
                                    if (file && imgPreview) {
                                        const reader = new FileReader();
                                        reader.onload = function (e) {
                                            imgPreview.src = e.target.result;
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <div>
                                <label htmlFor="create-product-img">Choose Image</label>
                                <img id="create-product-img-preview" alt="Preview"/>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-product-name">Name</label>
                            <input type="text" id="create-product-name" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-product-artist">Artist</label>
                            <input type="text" id="create-product-artist" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-product-year">Year</label>
                            <input type="text" id="create-product-year" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-product-genre">Genre</label>
                            <select id="create-product-genre">
                            <option value="">Select Genre</option>
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                {genre}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-product-description">Description</label>
                            <br />
                            <textarea
                            id="create-product-description"
                            rows="5"
                            cols="20"
                            maxLength="128"
                            ></textarea>
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-product-price">Price</label>
                            <input type="text" id="create-product-price" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-product-stock">Stock</label>
                            <input type="text" id="create-product-stock" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-product-sold">Sold</label>
                            <input type="text" id="create-product-sold" />
                        </div>
                        <div className="button-group">
                            <button onClick={handleCreateProductSubmit}>Create</button>
                            <button onClick={() => setShowCreateOverlay(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showEditOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Edit Product</h2>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                id="edit-product-img"
                                ref={imageRef}
                                onChange={() => {
                                const file = imageRef.current.files[0];
                                const imgPreview = document.getElementById('edit-product-img-preview');
                                    if (file && imgPreview) {
                                        const reader = new FileReader();
                                        reader.onload = function (e) {
                                            imgPreview.src = e.target.result;
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <div>
                                <label htmlFor="edit-product-img">Choose Image</label>
                                <img id="edit-product-img-preview" alt="Preview"/>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-product-name">Name</label>
                            <input
                                type="text"
                                id="edit-product-name"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-product-artist">Artist</label>
                            <input
                                type="text"
                                id="edit-product-artist"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-product-year">Year</label>
                            <input
                                type="text"
                                id="edit-product-year"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-product-genre">Genre</label>
                            <select id="edit-product-genre">
                                <option value="">Select Genre</option>
                                {genres.map((genre) => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-product-description">Description</label>
                            <br/>
                            <textarea
                                id="edit-product-description"
                                rows="5"
                                cols="20"
                                maxLength="128"
                            ></textarea>
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-product-price">Price</label>
                            <input
                                type="text"
                                id="edit-product-price"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-product-stock">Stock</label>
                            <input
                                type="text"
                                id="edit-product-stock"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-product-sold">Sold</label>
                            <input
                                type="text"
                                id="edit-product-sold"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-product-date">Date added</label>
                            <input
                                type="date"
                                id="edit-product-date"
                            />
                        </div>
                        <div className="button-group">
                            <button onClick={handleEditProductSubmit}>Save</button>
                            <button onClick={() => setShowEditOverlay(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductsCRUD;