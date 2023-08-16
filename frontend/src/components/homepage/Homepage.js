import React, {useState} from "react";

const Homepage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [title, setTitle] = useState("");
    const [showResults, setShowResults] = useState(false)


    const handleSearch = async () => {
        try {
            const response = await fetch(`/homepage/bytitle/${title}`);
            const data = await response.json();
            console.log('Data', data)
            setSearchResults([data]);
            setShowResults(true)
        } catch (error) {
            console.error("Error fetching search results: ", error)
        }
        console.log('Homepage component line 16',searchResults)
    };


    return (
        <div>
            <h1>Search for a movie of tv show title</h1>
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
                    <p key={result._id}>{result.title}</p>
                    <p key={result._id}>Synopsis: {result.synopsis}</p>
                    <p key={result._id}>Rating: {result.rating}</p>
                    </div>
                ))}
                </div>
            </div>
            )}
        </div>
    )
}

export default Homepage;