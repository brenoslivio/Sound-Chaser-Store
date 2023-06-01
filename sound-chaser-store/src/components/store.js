import '../css/store.css';
import React, { useState, useEffect } from 'react';

function date_sort(b, a) {
    return new Date(a.date_added).getTime() - new Date(b.date_added).getTime();
}

async function getAlbums() {
    const products = await fetch("http://localhost:8000/albums", {cache: "reload"})
                        .then(response => response.json());

    let sortedAlbums = products.albums.sort(date_sort);
    
    return sortedAlbums;
}

function Store(){
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

                    <div id="container1">
                        <div className="card">
                            <div className="album">
                                <img src={albums[0].img} alt={albums[0].name}/>
                            </div>
                            <div className="text">
                                {albums[0].name} ({albums[0].year}) <br/>
                                {albums[0].artist} <br/>
                                <br/>
                                ${albums[0].price}
                            </div>
                        </div>
                    </div>

                    <div id="container2">
                        <div className="card">
                            <div className="album">
                                <img src={albums[1].img} alt={albums[1].name}/>
                            </div>
                            <div className="text">
                                {albums[1].name} ({albums[1].year}) <br/>
                                {albums[1].artist} <br/>
                                <br/>
                                ${albums[1].price}
                            </div>
                        </div>
                    </div>

                    <div id="container3">
                        <div className="card">
                            <div className="album">
                                <img src={albums[2].img} alt={albums[2].name}/>
                            </div>
                            <div className="text">
                                {albums[2].name} ({albums[2].year}) <br/>
                                {albums[2].artist} <br/>
                                <br/>
                                ${albums[2].price}
                            </div>
                        </div>
                    </div>

                    <div id="container4">
                        <div className="card">
                            <div className="album">
                                <img src={albums[3].img} alt={albums[3].name}/>
                            </div>
                            <div className="text">
                                {albums[3].name} ({albums[3].year}) <br/>
                                {albums[3].artist} <br/>
                                <br/>
                                ${albums[3].price}
                            </div>
                        </div>
                    </div>

                    <div id="container5">
                        <div className="card">
                            <div className="album">
                                <img src={albums[4].img} alt={albums[4].name}/>
                            </div>
                            <div className="text">
                                {albums[4].name} ({albums[4].year}) <br/>
                                {albums[4].artist} <br/>
                                <br/>
                                ${albums[4].price}
                            </div>
                        </div>
                    </div>

                    <div id="container6">
                        <div className="card">
                            <div className="album">
                                <img src={albums[5].img} alt={albums[5].name}/>
                            </div>
                            <div className="text">
                                {albums[5].name} ({albums[5].year}) <br/>
                                {albums[5].artist} <br/>
                                <br/>
                                ${albums[5].price}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Store;