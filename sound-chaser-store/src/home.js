import './css/home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function date_sort(b, a) {
    return new Date(a.date_added).getTime() - new Date(b.date_added).getTime();
}

async function getLatestAdditions() {
    const products = await fetch("http://localhost:8000/products")
                        .then(response => response.json());

    let sortedAlbums = products.albums.sort(date_sort).slice(0, 4);
    console.log(sortedAlbums);
    
    return sortedAlbums;
}

function Home(){
    const [latestAdditions, setLatestAdditions] = useState([]);
    let navigate = useNavigate(); 

    const routeChange = () =>{ 
      let path = "quiz"; 
      navigate(path);
    }

    useEffect(() => {
        getLatestAdditions()
        .then(additions => setLatestAdditions(additions))
        .catch(error => console.error(error));
    }, []);

    if (latestAdditions.length === 0) {
        return <div className="page">Loading...</div>;
    }

    return (
        <div>
            <div className="banner">
                <div className="banner-img"></div>
                <div className="title"> Discover music lost to time...</div>
                <div className="text"> 
                    From avant-garde jazz to <br/>
                    progressive rock, we have everything! <br/>
                    <br/>
                    Answer our quiz, and we will recommend <br/>
                    the best kinds of music to your taste!
                </div>
                <button onClick={routeChange} className="banner-btn">Take the quiz!</button>
            </div>

            <div className="home-page">
                <div className="layer">
                    <div className="additions">
                        <div className="title"> Latest additions </div>

                        <div className="card">
                            <div className="album">
                                <img src={require("" + latestAdditions[0].img)} alt={latestAdditions[0].name}/>
                            </div>
                            <div className="card-text">
                                <b>Album:</b> {latestAdditions[0].name} <br/>
                                <b>Artist:</b> {latestAdditions[0].artist} <br/>
                                <b>Year:</b> {latestAdditions[0].year} <br/>
                                <b>Genre:</b> {latestAdditions[0].genre} <br/>
                            </div>
                            <div className="card-price">
                                ${latestAdditions[0].price}
                            </div>
                            <button className="card-btn">Add to cart</button>
                        </div>

                        <div className="card">
                            <div className="album">
                                <img src={require("" + latestAdditions[1].img)} alt={latestAdditions[1].name}/>
                            </div>
                            <div className="card-text">
                                <b>Album:</b> {latestAdditions[1].name} <br/>
                                <b>Artist:</b> {latestAdditions[1].artist} <br/>
                                <b>Year:</b> {latestAdditions[1].year} <br/>
                                <b>Genre:</b> {latestAdditions[1].genre} <br/>
                            </div>
                            <div className="card-price">
                                ${latestAdditions[1].price}
                            </div>
                            <button className="card-btn">Add to cart</button>
                        </div>

                        <div className="card">
                            <div className="album">
                                <img src={require("" + latestAdditions[2].img)} alt={latestAdditions[2].name}/>
                            </div>
                            <div className="card-text">
                                <b>Album:</b> {latestAdditions[2].name} <br/>
                                <b>Artist:</b> {latestAdditions[2].artist} <br/>
                                <b>Year:</b> {latestAdditions[2].year} <br/>
                                <b>Genre:</b> {latestAdditions[2].genre} <br/>
                            </div>
                            <div className="card-price">
                                ${latestAdditions[2].price}
                            </div>
                            <button className="card-btn">Add to cart</button>
                        </div>

                        <div className="card">
                            <div className="album">
                                <img src={require("" + latestAdditions[3].img)} alt={latestAdditions[3].name}/>
                            </div>
                            <div className="card-text">
                                <b>Album:</b> {latestAdditions[3].name} <br/>
                                <b>Artist:</b> {latestAdditions[3].artist} <br/>
                                <b>Year:</b> {latestAdditions[3].year} <br/>
                                <b>Genre:</b> {latestAdditions[3].genre} <br/>
                            </div>
                            <div className="card-price">
                                ${latestAdditions[3].price}
                            </div>
                            <button className="card-btn">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;