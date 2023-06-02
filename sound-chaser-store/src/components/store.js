import '../css/store.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function date_sort(b, a) {
    return new Date(a.date_added).getTime() - new Date(b.date_added).getTime();
}

async function getAlbums() {
    const products = await fetch("http://localhost:8000/albums", {cache: "reload"})
                            .then(response => response.json());

    let sortedAlbums = products.albums.sort(date_sort);
    
    return sortedAlbums;
} 

function Store({ searchValue }){

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getAlbums()
        .then(products => setAlbums(products))
        .catch(error => console.error(error));
    }, []);

    if (albums.length === 0) {
        return (
            <div className="store-page">
                <div className="layer">
                    <div className="filter">
                        <div className="genres">
                            <div className="title">Genres</div>
                            <br/>
                            <input type="checkbox" id="classic_rock" name="classic_rock" value="classic_rock"/>
                            <label for="classic_rock"> Classic Rock </label><br/>
                            <input type="checkbox" id="alternative_rock" name="alternative_rock" value="alternative_rock"/>
                            <label for="alternative_rock"> Alternative Rock </label><br/>
                            <input type="checkbox" id="progressive_rock" name="progressive_rock" value="progressive_rock"/>
                            <label for="progressive_rock"> Progressive Rock </label><br/>
                            <input type="checkbox" id="jazz" name="jazz" value="jazz"/>
                            <label for="jazz"> Jazz </label><br/>
                            <input type="checkbox" id="classical" name="classical" value="classical"/>
                            <label for="classical"> Classical Music </label><br/>
                            <input type="checkbox" id="pop" name="pop" value="pop"/>
                            <label for="pop"> Pop </label><br/>
                            <input type="checkbox" id="rap" name="rap" value="rap"/>
                            <label for="rap"> Rap </label><br/>
                            <br/>
                            <div className="title">Price range</div>
                            <br/>
                            <input type="text" id="price_min" name="price_min" placeholder="Min"/>
                            |
                            <input type="text" id="price_max" name="price_max" placeholder="Max"/>
                            <br/>
                            <br/>
                            <div className="title">Album year</div>
                            <br/>
                            <input type="text" id="year_min" name="year_min" placeholder="Min"/>
                            |
                            <input type="text" id="year_max" name="year_max" placeholder="Max"/>
                            <br/>
                            <br/>
                            <button id="filter-btn">Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const filteredItems = albums.filter((album) =>
        album.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    console.log(filteredItems);

    return (
        <div className="store-page">
            <div className="layer">
                <div className="filter">
                    <div className="genres">
                        <div className="title">Genres</div>
                        <br/>
                        <input type="checkbox" id="classic_rock" name="classic_rock" value="classic_rock"/>
                        <label for="classic_rock"> Classic Rock </label><br/>
                        <input type="checkbox" id="alternative_rock" name="alternative_rock" value="alternative_rock"/>
                        <label for="alternative_rock"> Alternative Rock </label><br/>
                        <input type="checkbox" id="progressive_rock" name="progressive_rock" value="progressive_rock"/>
                        <label for="progressive_rock"> Progressive Rock </label><br/>
                        <input type="checkbox" id="jazz" name="jazz" value="jazz"/>
                        <label for="jazz"> Jazz </label><br/>
                        <input type="checkbox" id="classical" name="classical" value="classical"/>
                        <label for="classical"> Classical Music </label><br/>
                        <input type="checkbox" id="pop" name="pop" value="pop"/>
                        <label for="pop"> Pop </label><br/>
                        <input type="checkbox" id="rap" name="rap" value="rap"/>
                        <label for="rap"> Rap </label><br/>
                        <br/>
                        <div className="title">Price range</div>
                        <br/>
                        <input type="text" id="price_min" name="price_min" placeholder="Min"/>
                        |
                        <input type="text" id="price_max" name="price_max" placeholder="Max"/>
                        <br/>
                        <br/>
                        <div className="title">Album year</div>
                        <br/>
                        <input type="text" id="year_min" name="year_min" placeholder="Min"/>
                        |
                        <input type="text" id="year_max" name="year_max" placeholder="Max"/>
                        <br/>
                        <br/>
                        <button id="filter-btn">Filter</button>
                    </div>
                </div>
                <div className="albums">
                    {filteredItems.map((album, index) => (
                        <Link to={"/product/" + album.id}>
                            <div id={`container${index + 1}`}>
                                <div className="card">
                                    <div className="album">
                                        <img src={album.img} alt={album.name} />
                                    </div>
                                    <div className="text">
                                        {album.name} ({album.year}) <br />
                                        {album.artist} <br />
                                    <br />
                                        ${album.price}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Store;