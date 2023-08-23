import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"; // Import Grid component
import { truncateSynopsis } from "../homepage/Homepage";
const defaultTheme = createTheme();

const WatchLater = () => {
    const id = window.localStorage.getItem('userId')
    const [watchLaterMovies, setWatchLaterMovies] = useState([]); 
    

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
    
    const removeFromWatchLater = async (movieId) => {
        const id = window.localStorage.getItem('userId');
        try {
            const response = await fetch(`/users/${id}/watch-later/${movieId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },   
            });
    
            if (response.ok) {
                const response = await fetch(`/users/${id}/watch-later`);
                if (response.ok) {
                    const data = await response.json();
                    setWatchLaterMovies(data.watchLater);
                    
                } else {
                    console.error("Error getting watch-later movies:", response.statusText);
                }
            } else {
                console.error("Error removing movie from watch later:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    
    return (
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography component="h2" variant="h4" align="center" gutterBottom>
            Movies in Watch Later
          </Typography>
          <Grid container spacing={4}>
            {" "}
            {/* Use Grid container */}
            {watchLaterMovies.length > 0 ? (
              watchLaterMovies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                  {" "}
                  {/* Adjust the grid item widths */}
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: "100%" }}
                      image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <CardContent>
                      <Link
                        to={`/movie-links/${movie.id}/${movie.title}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography variant="h5" component="h2">
                          {movie.title}
                        </Typography>
                      </Link>
                      <Typography variant="body1">
                        {truncateSynopsis(movie.overview, 350)}{" "}
                      </Typography>
                      <Typography variant="body2">
                        Rating: {movie.vote_average}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => removeFromWatchLater(movie.id)}
                      >
                        Remove from Watch Later
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" align="center">
                No movies in watch later.
              </Typography>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    );
}

export default WatchLater;
