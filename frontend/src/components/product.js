import '../css/product.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

/* Retrieve specific album based on id */
async function getAlbumById(id) {
    const album = await fetch(`http://localhost:8000/albums/${id}`, {cache: "reload"})
        .then(response => response.json());
    
    return album;
}

/* Retrieve related albums based on genre */
async function getRelatedAlbums(album) {
    const albums = await fetch("http://localhost:8000/albums", {cache: "reload"})
                            .then(response => response.json());
    let relatedAlbums = [];

    for (let i = 0; i < albums.length; i++) {

        if (albums[i].genre === album.genre && albums[i].id !== album.id) {
            relatedAlbums.push(albums[i]);
        }
    }

    return relatedAlbums;
}

/* Options available based on the item's stock */
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

/* Product page */
function Product({ userLogin, userUpdate }){
    const [messageAlert, setMessageAlert] = useState("");
    const params = useParams();

    const [album, setAlbum] = useState([]);
    const [relatedAlbums, setRelatedAlbums] = useState([]);
    const [quantity, setQuantity] = useState(1);

    let navigate = useNavigate(); 

    const addCart = (id, stock) =>{ 
        if (userLogin){
            if (stock > 0) {
                const item = {id: id, quantity: quantity}
                const itemExists = userLogin.cart.some((cartItem) => cartItem.id === item.id);

                if (!itemExists) {
                    userLogin.cart.push(item);
                    userUpdate(userLogin);
                    navigate("../cart", {replace: true});
                } else {
                    setMessageAlert("Item already added to the cart!");
                }
                
            } else {
                setMessageAlert("Album out of stock!");
            }
        } else {
            setMessageAlert("Login required to add to cart.");
        }
    }

    useEffect(() => {
        getAlbumById(params.id)
        .then(product => {setAlbum(product);})
        .catch(error => console.error(error));
    }, [params.id]);

    useEffect(() => {
        getRelatedAlbums(album)
        .then(products => {setRelatedAlbums(products);})
        .catch(error => console.error(error));
    }, [album]);

    if (album === null) {
        navigate("/", {replace: true});
        return;
    }

    if (album.length === 0) {
        return (
            <main>
                <div className="layer">
                    <div className="product-albums">
                        <div className="product">
                        </div>
                        <div className="related">
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main>
            <div className="layer">
                <div className="product-albums">
                    <div className="product">
                        <div className="product-album">
                            <img src={album.img + "?cache=" + (Math.random() * 99999999)} alt={album.name}/>
                        </div>
                        <div className="title">
                            {album.name} ({album.year}) - {album.artist}
                        </div>
                        <div className="genre">
                            {album.genre}
                        </div>
                        <div className="description">
                            {album.description}
                        </div>
                        <div className="price">
                            ${album.price}
                        </div>
                        <div className="quantity">
                            <label htmlFor="qnt">Quantity:</label>
                            <select name="qnt" id="qnt" onChange={(e) => setQuantity(parseInt(e.target.value))}>
                                {optionsAvailable(album.stock)}
                            </select>
                            <br/>
                            <br/>
                            <div className="stock">
                                ({album.stock} in stock)     
                            </div>
                        </div>
                        <button onClick={() => addCart(album.id, album.stock)} className="product-btn">Add to cart</button>
                    </div>

                    <div className="related">
                            <div className="title">
                                Related albums
                            </div>
                            {/* Show four related albums based on genre */}
                            {relatedAlbums.slice(0, 4).map((relatedAlbum, index) => (
                                <Link to={"/product/" + relatedAlbum.id} key={index}>
                                    <div id={`related-album${index + 1}`}>
                                    <div className="product-album">
                                        <img src={relatedAlbum.img + "?cache=" + (Math.random() * 99999999)} alt={relatedAlbum.name} />
                                    </div>
                                    <div className="text">
                                        {relatedAlbum.name} <br />
                                        {relatedAlbum.artist} <br />
                                        <br />
                                    </div>
                                    </div>
                                </Link>
                            ))}
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
        </main>
    )
}

export default Product;