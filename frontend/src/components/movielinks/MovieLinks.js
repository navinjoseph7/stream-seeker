import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import {Box} from "@mui/material";

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
       <Navbar />
       <Container sx={{ textAlign: "center", my: 4 }}>
         <Typography variant="h4" gutterBottom>
           {movieTitle}
         </Typography>
         {movieLinks === undefined ? (
           <Typography variant="body1">
             This movie is not available in your region.
           </Typography>
         ) : (
           <div>
             <Typography variant="h5">Watch Links</Typography>
             <Box pt={3}>
           <Button variant="contained" href={movieLinks?.link}>
             Link for The Movie Database
           </Button>
         </Box>
             <Typography variant="h6" pb={3} pt={3}>
               You can rent it on:
             </Typography>
             <Grid container justifyContent="center" spacing={2}>
               {movieLinks?.rent?.map((link, index) => (
                 <Grid item key={index}>
                   <img
                     className="poster-image"
                     src={`https://image.tmdb.org/t/p/w500/${link.logo_path}`}
                     alt={link.provider_name}
                     style={{ width: "50px", height: "50px" }}
                   />
                   <Typography variant="body1">{link.provider_name}</Typography>
                 </Grid>
               ))}
             </Grid>
             <Typography variant="h6" pb={3} pt={3}>
               You can buy it on:
             </Typography>
             <Grid container justifyContent="center" spacing={2}>
               {movieLinks?.buy?.map((link, index) => (
                 <Grid item key={index}>
                   <img
                     className="poster-image"
                     src={`https://image.tmdb.org/t/p/w500/${link.logo_path}`}
                     alt={link.provider_name}
                     style={{ width: "50px", height: "50px" }}
                   />
                   <Typography variant="body1">{link.provider_name}</Typography>
                 </Grid>
               ))}
             </Grid>
           </div>
         )}
         
       </Container>
     </div>
   );
};

export default MovieLinks;