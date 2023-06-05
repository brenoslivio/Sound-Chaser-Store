import '../css/product.css';
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function getAlbumById(albums, id) {
    for (let i = 0; i < albums.length; i++) {

        if (albums[i].id === parseInt(id)) {
            return albums[i];
        }
    }

    return null;
}

function getRelatedAlbums(albums, album) {
    let relatedAlbums = [];

    for (let i = 0; i < albums.length; i++) {

        if (albums[i].genre === album.genre && albums[i].id !== album.id) {
            relatedAlbums.push(albums[i]);
        }
    }

    return relatedAlbums;
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

function Product({ userLogin, userUpdate, albums }){

    const params = useParams();

    const [quantity, setQuantity] = useState(1);

    let navigate = useNavigate(); 

    if (albums.length === 0) {
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
                    alert("Item already added to the cart!");
                }
                
            } else {
                alert("Album out of stock!");
            }
        } else {
            alert("Login required to add to cart.");
        }
    }

    let album = getAlbumById(albums, params.id);

    let relatedAlbums = getRelatedAlbums(albums, album);

    return (
        <main>
            <div className="layer">
                <div className="product-albums">
                    <div className="product">
                        <div className="product-album">
                            <img src={album.img} alt={album.name}/>
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
                            {relatedAlbums.slice(0, 4).map((relatedAlbum, index) => (
                                <Link to={"/product/" + relatedAlbum.id} key={index}>
                                    <div id={`related-album${index + 1}`}>
                                    <div className="product-album">
                                        <img src={relatedAlbum.img} alt={relatedAlbum.name} />
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
        </main>
    )
}

export default Product;