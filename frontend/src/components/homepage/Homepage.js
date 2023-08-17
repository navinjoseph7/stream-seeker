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
                {console.log(searchResults)}
                <h2>Search Results</h2>
                <div>
                {/* {searchResults.map((result) => ( */}
                    <div>
                    <p  >{searchResults[0].title}</p>
                    <p >Synopsis: {searchResults[0].overview}</p>
                    <p >Poster: <img src={searchResults[0].poster_path}></img></p>
                    <p >Rating: {searchResults[0].rating}</p>
                    <p >Links: {searchResults[0]?.links?.link}</p>
                    
                    
                    </div>
                {/* ))} */}
                </div>
            </div>
            )}
        </div>
    )
}

export default Homepage;
