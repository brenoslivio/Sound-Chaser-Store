import '../css/store.css';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";

/* Retrieve albums from server */
async function getAlbums() {
    const albums = await fetch("http://localhost:8000/albums", {cache: "reload"})
                            .then(response => response.json());
  
    return albums;
}  

/* Sort albums based on specific criteria */
function sortAlbums(albums, sortCriteria) {
    let sortedAlbums = albums.sort((a, b) => {
        if (sortCriteria === "date") {
            return new Date(a.date_added).getTime() - new Date(b.date_added).getTime();
        } else if (sortCriteria === "artist") {
            return a.artist.localeCompare(b.artist);
        } else if (sortCriteria === "album") {
            return a.name.localeCompare(b.name);
        } else {
            return a.year - b.year;
        } 
    });
    
    return sortedAlbums;
}

/* page to check and filter for products */
function Store({ searchValue }){
    const genresList = ["classic rock", "alternative rock", "progressive rock", "jazz", 
                        "classical music", "pop", "rap"];

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const genreParam = genresList.includes(queryParams.get('genre')) ? queryParams.get('genre') : null;

    const [albums, setAlbums] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState(genreParam ? [genreParam] : []);

    const [currentPage, setCurrentPage] = useState(1);

    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [yearMin, setYearMin] = useState("");
    const [yearMax, setYearMax] = useState("");
    const [sortCriteria, setSortCriteria] = useState("date");
    const albumsPerPage = 6;

    useEffect(() => {
        setCurrentPage(1); // Reset currentPage to 1 when filtering changes
    }, [searchValue, selectedGenres, priceMin, priceMax, yearMin, yearMax, sortCriteria]);

    useEffect(() => {
        getAlbums()
        .then(products => {setAlbums(products);})
        .catch(error => console.error(error));
    }, []);
    
    if (albums.length === 0) {
        return (
            <div className="store-page">
                <div className="layer">
                    <div className="filter">
                        <div className="genres">
                            <div className="title">Sorting</div>
                            <br/>
                            <select id="sorting">
                                <option value="date">Sort by date added</option>
                                <option value="artist">Sort by artist name</option>
                                <option value="album">Sort by album name</option>
                                <option value="year">Sort by year</option>
                            </select>
                            <br/>
                            <br/>
                            <div className="title">Genres</div>
                            <br/>
                            <input type="checkbox" id="classic_rock" name="classic_rock" value="classic_rock"/>
                            <label htmlFor="classic_rock"> Classic Rock </label><br/>
                            <input type="checkbox" id="alternative_rock" name="alternative_rock" value="alternative_rock"/>
                            <label htmlFor="alternative_rock"> Alternative Rock </label><br/>
                            <input type="checkbox" id="progressive_rock" name="progressive_rock" value="progressive_rock"/>
                            <label htmlFor="progressive_rock"> Progressive Rock </label><br/>
                            <input type="checkbox" id="jazz" name="jazz" value="jazz"/>
                            <label htmlFor="jazz"> Jazz </label><br/>
                            <input type="checkbox" id="classical" name="classical" value="classical"/>
                            <label htmlFor="classical"> Classical Music </label><br/>
                            <input type="checkbox" id="pop" name="pop" value="pop"/>
                            <label htmlFor="pop"> Pop </label><br/>
                            <input type="checkbox" id="rap" name="rap" value="rap"/>
                            <label htmlFor="rap"> Rap </label><br/>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleGenreChange = (e) => {
        const genre = e.target.value;
        if (e.target.checked) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        }
      };
      
    const handlePriceChange = (e) => {
        if (e.target.name === "price_min") {
            setPriceMin(e.target.value);
        } else {
            setPriceMax(e.target.value);
        }
    };
      
    const handleYearChange = (e) => {
        if (e.target.name === "year_min") {
            setYearMin(e.target.value);
        } else {
            setYearMax(e.target.value);
        }
    };

    const handleSortCriteriaChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const sortedAlbums = sortAlbums(albums, sortCriteria);

    const filteredItems = sortedAlbums.filter((album) => {
        const isMatchedGenre = selectedGenres.length === 0 || selectedGenres.includes(album.genre.toLowerCase());
        const isWithinPriceRange =
            (priceMin === "" || album.price >= parseFloat(priceMin)) &&
            (priceMax === "" || album.price <= parseFloat(priceMax));
        const isWithinYearRange =
            (yearMin === "" || album.year >= parseInt(yearMin)) &&
            (yearMax === "" || album.year <= parseInt(yearMax));
        const isMatchedSearchValue = album.name.toLowerCase().includes(searchValue.toLowerCase()) 
            || album.artist.toLowerCase().includes(searchValue.toLowerCase());
        
        return (
            isMatchedGenre &&
            isWithinPriceRange &&
            isWithinYearRange &&
            isMatchedSearchValue
        );
    });

    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = filteredItems.slice(indexOfFirstAlbum, indexOfLastAlbum);

    return (
        <div className="store-page">
            <div className="layer">
                <div className="filter">
                    <div className="genres">
                        <div className="title">Sorting</div>
                        <br/>
                        <select id="sorting" value={sortCriteria} onChange={handleSortCriteriaChange}>
                            <option value="date">Sort by date added</option>
                            <option value="artist">Sort by artist name</option>
                            <option value="album">Sort by album name</option>
                            <option value="year">Sort by year</option>
                        </select>
                        <br/>
                        <br/>
                        <div className="title">Genres</div>
                        <br/>
                        <input type="checkbox" id="classic_rock" name="classic_rock" value="classic rock" onChange={handleGenreChange} checked={selectedGenres.includes('classic rock')}/>
                        <label htmlFor="classic_rock"> Classic Rock </label><br/>
                        <input type="checkbox" id="alternative_rock" name="alternative_rock" value="alternative rock" onChange={handleGenreChange} checked={selectedGenres.includes('alternative rock')}/>
                        <label htmlFor="alternative_rock"> Alternative Rock </label><br/>
                        <input type="checkbox" id="progressive_rock" name="progressive_rock" value="progressive rock" onChange={handleGenreChange} checked={selectedGenres.includes('progressive rock')}/>
                        <label htmlFor="progressive_rock"> Progressive Rock </label><br/>
                        <input type="checkbox" id="jazz" name="jazz" value="jazz" onChange={handleGenreChange} checked={selectedGenres.includes('jazz')}/>
                        <label htmlFor="jazz"> Jazz </label><br/>
                        <input type="checkbox" id="classical" name="classical" value="classical music" onChange={handleGenreChange} checked={selectedGenres.includes('classical music')}/>
                        <label htmlFor="classical"> Classical Music </label><br/>
                        <input type="checkbox" id="pop" name="pop" value="pop" onChange={handleGenreChange} checked={selectedGenres.includes('pop')}/>
                        <label htmlFor="pop"> Pop </label><br/>
                        <input type="checkbox" id="rap" name="rap" value="rap" onChange={handleGenreChange} checked={selectedGenres.includes('rap')}/>
                        <label htmlFor="rap"> Rap </label><br/>
                        <br/>
                        <div className="title">Price range</div>
                        <br/>
                        <input type="text" id="price_min" name="price_min" placeholder="Min" onChange={handlePriceChange}/>
                        |
                        <input type="text" id="price_max" name="price_max" placeholder="Max" onChange={handlePriceChange}/>
                        <br/>
                        <br/>
                        <div className="title">Album year</div>
                        <br/>
                        <input type="text" id="year_min" name="year_min" placeholder="Min" onChange={handleYearChange}/>
                        |
                        <input type="text" id="year_max" name="year_max" placeholder="Max" onChange={handleYearChange}/>
                    </div>
                </div>
                <div className="albums">
                    {currentAlbums.map((album, index) => (
                        <Link to={"/product/" + album.id} key={album.id}>
                            <div id={`container${index + 1}`}>
                                <div className="card">
                                    <div className="album">
                                        <img src={album.img + "?cache=" + (Math.random() * 99999999)} alt={album.name} />
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
                {/* Pagination ststem showing 6 albums per page */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(filteredItems.length / albumsPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Store;