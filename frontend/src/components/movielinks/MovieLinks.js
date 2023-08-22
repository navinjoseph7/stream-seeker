import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieLinks = () => {
    const { movieId, movieTitle } = useParams(); // Get the movie title from URL parameters
    const [movieLinks, setMovieLinks] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        const fetchMovieLinks = async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOThmZWNkMTc5ZjljNWZhYmQ3MzI1MDBjYjkxZjc1NCIsInN1YiI6IjY0ZGI0MzY5MDAxYmJkMDBlMzVkMmYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yi7avS_OqTTm_iJj_Kydr0YIIE2SFdhGTbyNm-4Hz5Y'
                }
            };
            const second_response = await fetch(url, options)
            if(second_response.status === 200) {
                const second_data = await second_response.json();
                const links = second_data.results.GB;
                setMovieLinks(links)
            }
            else{
                
                setErrorMessage("This movie is not available in your region.");
            
            }
        };
    
        fetchMovieLinks();
      }, [movieId]);

  return (
    <div>
      <h1>{movieTitle}</h1>
      {movieLinks === undefined  ? (
                <p>This movie is not available in your region.</p>
            ) : (
      <div>
      <h2>Watch Links</h2>
      <ul>Link for The Movie Database : <a href={movieLinks.link}>{movieLinks.link}</a>
      <h2>Renting Platforms:</h2>
        {movieLinks?.rent?.map((link, index) => (
          <li key={index}>
               <img
                        className="poster-image"
                        src={`https://image.tmdb.org/t/p/w500/${link.logo_path}`} // poster_path is null in some movies
                        alt={link.provider_name} 
                        style={{ width: "50px", height: "50px" }}
                      />
              {link.provider_name}
            </li>
       ))}
       <h2>You can buy it on:</h2>
        {movieLinks?.buy?.map((link, index) => (
          <li key={index}>
               <img
                        className="poster-image"
                        src={`https://image.tmdb.org/t/p/w500/${link.logo_path}`} // poster_path is null in some movies
                        alt={link.provider_name} 
                        style={{ width: "50px", height: "50px" }}
                      />
              {link.provider_name}
            </li>
       ))}
      </ul></div>)}
    </div>
  );
};

export default MovieLinks;