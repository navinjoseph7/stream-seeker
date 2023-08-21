import React, {useState} from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Import React Router modules
import MovieLinks from "../movielinks/MovieLinks";
import '../homepage/Homepage.css'

const Homepage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [title, setTitle] = useState("");
    const [showResults, setShowResults] = useState(false)


    const handleSearch = async () => {
        try {
            const response = await fetch(`/homepage/bytitle/${title}`);
            const data = await response.json();
            setSearchResults(data); // data is an array, no need for []
            setShowResults(true)
        } catch (error) {
            console.error("Error fetching search results: ", error)
        }
    };


    return (
        
        <div className="main-homepage-div">
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
                    
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      
      );
  }
export default Homepage;
