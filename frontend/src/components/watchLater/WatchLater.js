import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';

const WatchLater = () => {
    const id = window.localStorage.getItem('userId')
    const [watchLaterMovies, setWatchLaterMovies] = useState([]); 
    console.log("ID is", id)

    useEffect(() => {
        fetchWatchLaterMovies();
    }, []);

    const fetchWatchLaterMovies = async () => {
        try {
        const response = await fetch(`/users/${id}/watch-later`);
        if (response.ok) {
            const data = await response.json();
            setWatchLaterMovies(data.watchLater);
        } else {
            console.error("Failed to fetch watch later movies");
        }
        } catch (error) {
        console.error("Error fetching watch later movies:", error);
        }
    };
    console.log("watchLaterMovies:", watchLaterMovies);

    return (
        <div>
        <Navbar />
        <h2>Movies in Watch Later</h2>
        {watchLaterMovies.length > 0 ? (
        <ul>
        {watchLaterMovies.map((movie) => (
            <li key={movie._id}>
            <h3>{movie.title}</h3>
            <p>{movie.synopsis}</p>
            </li>
        ))}
        </ul>
            ) : (
        <p>No movies in watch later.</p>
        )}
        </div>
    );
}

export default WatchLater;
