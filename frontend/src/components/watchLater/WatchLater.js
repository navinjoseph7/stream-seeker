import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
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
            <div key={movie._id}>
            <Link to={`/movie-links/${movie.id}/${movie.title}`} style={{ textDecoration: 'none' }}><h2>{movie.title}</h2></Link>
            <p>Synopsis: {movie.overview}</p>
            <div className="poster-container">
                    <img
                    className="poster-image"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // poster_path is null in some movies
                    alt={movie.title}
                    />
            </div>
            <p>Rating: {movie.vote_average}</p>
            </div>
        ))}
        </ul>
            ) : (
        <p>No movies in watch later.</p>
        )}
        </div>
    );
}

export default WatchLater;
