import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieLinks = () => {
    const { movieId, movieTitle } = useParams(); // Get the movie title from URL parameters
    const [movieLinks, setMovieLinks] = useState([]);
    useEffect(() => {
        const fetchMovieLinks = async () => {
          try {
            const response = await fetch(`/homepage/bytitle/${movieId}`); // Replace with your API endpoint
            const data = await response.json();
            console.log(response)
            setMovieLinks(data);
          } catch (error) {
            console.error("Error fetching movie links: ", error);
          }
        };
    
        fetchMovieLinks();
      }, [movieId]);

  return (
    <div>
      <h1>{movieTitle}</h1>
      <h2>Watch Links</h2>
      <ul>
        {movieLinks.map((link, index) => (
          <li key={index}>
            <a href={link.link} target="_blank" rel="noopener noreferrer">
              {link.platform}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieLinks;