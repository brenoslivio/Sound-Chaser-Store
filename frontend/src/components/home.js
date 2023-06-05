import '../css/home.css';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function Home({ userLogin, userUpdate, albums }){
    let navigate = useNavigate(); 

    const routeChange = () =>{ 
        navigate("/quiz");
        window.scrollTo(0, 0);
    }

    const addCart = (id, stock) =>{ 
        if (userLogin){
            if (stock > 0) {
                const item = {id: id, quantity: 1}
                const itemExists = userLogin.cart.some((cartItem) => cartItem.id === item.id);

                if (!itemExists) {
                    userLogin.cart.push(item);
                    userUpdate(userLogin);
                    navigate("../cart", {replace: true});
                    window.scrollTo(0, 0);
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

    if (albums.length === 0) {
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    let sortedAlbums = albums.sort((b, a) => {
        return new Date(a.date_added).getTime() - new Date(b.date_added).getTime();
    });

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

                        {sortedAlbums.slice(0, 4).map((album, index) => (
                            <div className="main-card" key={index}>
                                <Link to={'/product/' + album.id}>
                                <div className="main-album">
                                    <img src={album.img} alt={album.name} />
                                </div>
                                <div className="main-card-text">
                                    <b>Album:</b> {album.name} <br/>
                                    <b>Artist:</b> {album.artist} <br/>
                                    <b>Year:</b> {album.year} <br/>
                                    <b>Genre:</b> {album.genre} <br/>
                                </div>
                                </Link>
                                <div className="main-card-price">${album.price}</div>
                                <button onClick={() => addCart(album.id, album.stock)} className="card-btn">Add to cart</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;