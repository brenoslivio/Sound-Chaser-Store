import '../css/product.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function date_sort(b, a) {
    return new Date(a.date_added).getTime() - new Date(b.date_added).getTime();
}

async function getAlbums() {
    const products = await fetch("http://localhost:8000/albums", {cache: "reload"})
                        .then(response => response.json());

    let sortedAlbums = products.albums.sort(date_sort);
    
    return sortedAlbums;
}

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

function getLinkId(id){
    if (id !== ""){
        return "/product/" + id
    }

    return ""
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

function Product(){

    const params = useParams();

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getAlbums()
        .then(products => setAlbums(products))
        .catch(error => console.error(error));
    }, []);

    if (albums.length === 0) {
        return (
            <main>
                <div class="layer">
                    <div class="product-albums">
                        <div class="product">
                        </div>
                        <div class="related">
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    let album = getAlbumById(albums, params.id);

    let relatedAlbums = getRelatedAlbums(albums, album);

    return (
        <main>
            <div class="layer">
                <div class="product-albums">
                    <div class="product">
                        <div class="product-album">
                            <img src={album.img} alt={album.name}/>
                        </div>
                        <div class="title">
                            {album.name} ({album.year}) - {album.artist}
                        </div>
                        <div class="genre">
                            {album.genre}
                        </div>
                        <div class="description">
                            {album.description}
                        </div>
                        <div class="price">
                            ${album.price}
                        </div>
                        <div class="quantity">
                            <label for="qnt">Quantity:</label>
                            <select name="qnt" id="qnt">
                                {optionsAvailable(album.stock)}
                            </select>
                            <br/>
                            <br/>
                            <div class="stock">
                                ({album.stock} in stock)     
                            </div>
                        </div>
                        <button class="product-btn">Add to cart</button>
                    </div>

                    <div class="related">
                            <div class="title">
                                Related albums
                            </div>
                            {relatedAlbums.slice(0, 4).map((relatedAlbum, index) => (
                                <Link to={getLinkId(relatedAlbum.id)}>
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