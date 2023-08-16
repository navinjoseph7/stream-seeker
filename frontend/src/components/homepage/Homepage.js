import React, {useState} from "react";
import '../homepage/Homepage.css'

const Homepage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [title, setTitle] = useState("");
    const [showResults, setShowResults] = useState(false)


    const handleSearch = async () => {
        try {
            const response = await fetch(`/homepage/bytitle/${title}`);
            const data = await response.json();
            setSearchResults([data]);
            setShowResults(true)
        } catch (error) {
            console.error("Error fetching search results: ", error)
        }
    };


    return (
        <div className="main-homepage-div">
            <h1 id='heading'>Search for a movie or tv show title</h1>
            <input
                type='text'
                placeholder="Enter a title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            { showResults && (
            <div>
                <h2>Search Results</h2>
                <div>
                {searchResults.map((result) => (
                    <div>
                    <p id='title' key={result._id}>{result.title}</p>
                    <p key={result._id}>Synopsis: {result.synopsis}</p>
                    <p key={result._id}>Release Year: {result.release_year}</p>
                    <p key={result._id}>Rating: {result.rating}</p>
                    <p key={result._id}>Links: {result.links}</p>
                    </div>
                ))}
                </div>
            </div>
            )}
        </div>
    )
}

export default Homepage;
