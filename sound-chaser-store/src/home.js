import './css/home.css';
import React from 'react';
import img1 from "./imgs/albums/traffic_circle.png";

function home(){

    return (
        <div>
            {/* Call to action for quiz  */}
            <div class="banner">
                <div class="banner-img"></div>
                <div class="title"> Discover music lost to time...</div>
                <div class="text"> 
                    From avant-garde jazz to <br/>
                    progressive rock, we have everything! <br/>
                    <br/>
                    Answer our quiz, and we will recommend <br/>
                    the best kinds of music to your taste!
                </div>
                <button class="banner-btn">Take the quiz!</button>
            </div>
            <main>
                <div className="layer">
                    <div className="additions">
                        <div className="title"> Latest additions </div>

                        <div className="card">
                            <div className="album">
                                <img src={img1} alt="Traffic Circle"/>
                            </div>
                            <div className="card-text">
                                <b>Album:</b> Traffic Circle <br/>
                                <b>Artist:</b> No <br/>
                                <b>Year:</b> 1971 <br/>
                                <b>Genre:</b> Progressive Rock <br/>
                            </div>
                            <div className="card-price">
                                $49.99
                            </div>
                            <button className="card-btn">Add to cart</button>
                        </div>

                        <div className="card">
                            <div className="album">
                                <img src="imgs/albums/kind_of_pink.png" alt="Kind of Pink"/>
                            </div>
                            <div className="card-text">
                                <b>Album:</b> Kind of Pink <br/>
                                <b>Artist:</b> The Cool Jazz Trio <br/>
                                <b>Year:</b> 1969 <br/>
                                <b>Genre:</b> Jazz <br/>
                            </div>
                            <div className="card-price">
                                $49.99
                            </div>
                            <button className="card-btn">Add to cart</button>
                        </div>

                        <div className="card">
                            <div className="album">
                                <img src="imgs/albums/rated_m.png" alt="Rated M"/>
                            </div>
                            <div className="card-text">
                                <b>Album:</b> Rated M <br/>
                                <b>Artist:</b> Rihaha <br/>
                                <b>Year:</b> 2009 <br/>
                                <b>Genre:</b> Pop <br/>
                            </div>
                            <div className="card-price">
                                $39.99
                            </div>
                            <button className="card-btn">Add to cart</button>
                        </div>

                        <div className="card">
                            <div className="album">
                                <img src="imgs/albums/zero.png" alt="Zero"/>
                            </div>
                            <div className="card-text">
                                <b>Album:</b> Zero <br/>
                                <b>Artist:</b> Hard Machine <br/>
                                <b>Year:</b> 1968 <br/>
                                <b>Genre:</b> Jazz <br/>
                            </div>
                            <div className="card-price">
                                $19.99
                            </div>
                            <button className="card-btn">Add to cart</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default home;