import './css/store.css';
import React from 'react';

function Store(){

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
                            {/* <div className="album">
                                <img src="imgs/albums/traffic_circle.png" alt="Traffic Circle"/>
                            </div> */}
                            <div className="text">
                                Traffic Circle (1971) <br/>
                                No <br/>
                                <br/>
                                $49.99
                            </div>
                        </div>
                    </div>

                    <div id="container2">
                        <div className="card">
                            <div className="album">
                                <img src="imgs/albums/kind_of_pink.png" alt="Kind of Pink"/>
                            </div>
                            <div className="text">
                                Kind of Pink (1969) <br/>
                                The Cool Jazz Trio <br/>
                                <br/>
                                $49.99
                            </div>
                        </div>
                    </div>

                    <div id="container3">
                        <div className="card">
                            <div className="album">
                                <img src="imgs/albums/rated_m.png" alt="Rated M"/>
                            </div>
                            <div className="text">
                                Rated M (2009) <br/>
                                Rihaha <br/>
                                <br/>
                                $39.99
                            </div>
                        </div>
                    </div>

                    <div id="container4">
                        <div className="card">
                            <div className="album">
                                <img src="imgs/albums/zero.png" alt="Zero"/>
                            </div>
                            <div className="text">
                                Zero (1968) <br/>
                                Hard Machine <br/>
                                <br/>
                                $19.99
                            </div>
                        </div>
                    </div>

                    <div id="container5">
                        <div className="card">
                            <div className="album">
                                <img src="imgs/albums/you_got_it.png" alt="you got it."/>
                            </div>
                            <div className="text">
                                you got it. (2017) <br/>
                                Magi-dami <br/>
                                <br/>
                                $39.99
                            </div>
                        </div>
                    </div>

                    <div id="container6">
                        <div className="card">
                            <div className="album">
                                <img src="imgs/albums/2012.png" alt="2012"/>
                            </div>
                            <div className="text">
                                2012 (1976) <br/>
                                Rash <br/>
                                <br/>
                                $39.99
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Store;