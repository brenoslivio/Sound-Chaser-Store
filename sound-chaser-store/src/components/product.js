import '../css/product.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

function Product(){

    const params = useParams();
    console.log(params.id);

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getAlbums()
        .then(products => setAlbums(products))
        .catch(error => console.error(error));
    }, []);

    if (albums.length === 0) {
        return (
            <div> Loading </div>
        )
    }

    let album = getAlbumById(albums, params.id);

    let relatedAlbums = getRelatedAlbums(albums, album);

    let numberRelated = relatedAlbums.length;

    for (let i = numberRelated; i < 4; i++) {
        let emptyAlbum = {"id": "", "name": "", "year": "", "artist": "", "price": ""}
        relatedAlbums.push(emptyAlbum);
    }

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
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
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
                            <div id="related-album1">
                                <div class="product-album">
                                    <img src={relatedAlbums[0].img} alt={relatedAlbums[0].name}/>
                                </div>
                                <div class="text">
                                    {relatedAlbums[0].name} <br/>
                                    {relatedAlbums[0].artist} <br/>
                                    <br/>
                                </div>
                            </div>
                            <div id="related-album2">
                                <div class="product-album">
                                    <img src={relatedAlbums[1].img} alt={relatedAlbums[1].name}/>
                                </div>
                                <div class="text">
                                    {relatedAlbums[1].name} <br/>
                                    {relatedAlbums[1].artist} <br/>
                                    <br/>
                                </div>
                            </div>
                            <div id="related-album3">
                                <div class="product-album">
                                    <img src={relatedAlbums[2].img} alt={relatedAlbums[2].name}/>
                                </div>
                                <div class="text">
                                    {relatedAlbums[2].name} <br/>
                                    {relatedAlbums[2].artist} <br/>
                                    <br/>
                                </div>
                            </div>
                            <div id="related-album4">
                                <div class="product-album">
                                    <img src={relatedAlbums[3].img} alt={relatedAlbums[3].name}/>
                                </div>
                                <div class="text">
                                    {relatedAlbums[3].name} <br/>
                                    {relatedAlbums[3].artist} <br/>
                                    <br/>
                                </div>
                            </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Product;