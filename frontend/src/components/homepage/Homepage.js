import React, {useState} from "react";

const Homepage = () => {
    const [searchResults, setSearchResults] = useState([])
    const [title, setTitle] = useState("");


    const handleSearch = aysnc () => {

    }



return (
    <div>
        <h1>Search for a movie of tv show title</h1>
        <input
            type='text'
            placeholder="Enter a title"
            value={title}
            onChange={}
        />
        <button onClick={handleSearch}>Search</button>
        <div>
            <h2>Results</h2>
            <ul>
                <li></li>
            </ul>
        </div>
    




    </div>
)

}