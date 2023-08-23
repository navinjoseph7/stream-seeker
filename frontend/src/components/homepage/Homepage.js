import React, {useState} from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Import React Router modules
import MovieLinks from "../movielinks/MovieLinks";
import '../homepage/Homepage.css'
import Navbar from "../Navbar/Navbar";

const Homepage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [title, setTitle] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [addedMovies, setAddedMovies] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`/homepage/bytitle/${title}`);
            const data = await response.json();
            setSearchResults(data); // data is an array, no need for []
            setShowResults(true)
        } catch (error) {
            console.error("Error fetching search results: ", error);
        }
    };

    const addToWatchLater = async (movie) => {
        const id = window.localStorage.getItem('userId')
        try {
            const response = await fetch(`/users/${id}/watch-later`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    movie: movie,
                }),
            });

            if (response.ok) {
                setAddedMovies((prevMovies) => [...prevMovies, movie._id]);
            } else {
                console.error("Error adding movie to watch later:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding movie to watch later:", error);
        }
    };

    const isAddedToWatchLater = (movieId) => {
        return addedMovies.includes(movieId);
    };

    return (
        
        <div className="main-homepage-div">
            <Navbar />
          <h1 id="heading">Search for a movie or tv show title</h1>
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          {showResults && (
            <div>
              <h2>Search Results</h2>
              <div>
                {searchResults.map((result, index) => (
                  <div key={index}>
                    <Link to={`/movie-links/${result.id}/${result.title}`} style={{ textDecoration: 'none' }}><h2>{result.title}</h2></Link>
                    <p>Synopsis: {result.overview}</p>
                    <div className="poster-container">
                      <img
                        className="poster-image"
                        src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} // poster_path is null in some movies
                        alt={result.title}
                      />
                    </div>
                    <p>Rating: {result.vote_average}</p>
                    <button
                            onClick={() => addToWatchLater(result)}
                            disabled={isAddedToWatchLater(result._id)}
                        >
                            {isAddedToWatchLater(result._id) ? "Added" : "Add to Watch Later"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
    );
}

export default Homepage;
