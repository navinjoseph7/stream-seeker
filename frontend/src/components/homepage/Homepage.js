import React, { useState } from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Import React Router modules
import MovieLinks from "../movielinks/MovieLinks";
import "../homepage/Homepage.css";
import Navbar from "../Navbar/Navbar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
const defaultTheme = createTheme();
const Homepage = () => {

const [searchResults, setSearchResults] = useState([]);
const [title, setTitle] = useState("");
const [showResults, setShowResults] = useState(false);
const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  
  const handleSearch = async () => {
    try {
      const response = await fetch(`/homepage/bytitle/${title}`);
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };
  

      const addToWatchLater = async (movie) => {
        const id = window.localStorage.getItem('userId')
        try {
            const response = await fetch(`/users/${id}/watch-later`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    movie: movie,
                }),
            });

            if (response.ok) {
              const response = await fetch(`/users/${id}/watch-later`);
                if (response.ok) {
                    const data = await response.json();
                    setWatchLaterMovies(data.watchLater);
                } else {
                    console.error("Error getting watch-later movies:", response.statusText);
                }
              }
        } catch (error) {
            console.error("Error adding movie to watch later:", error);
        }
    };

    const isAddedToWatchLater = (movie) => {
        return watchLaterMovies.some((watchLaterMovie) => watchLaterMovie.id === movie.id);
    };
  
  const truncateSynopsis = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Search for a movie or TV show title
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="column"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <TextField
                    label="Enter a title"
                    variant="outlined"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <Button variant="contained" onClick={handleSearch}>
                    Search
                  </Button>
                </Stack>
              </Container>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {showResults &&
              searchResults.map((result, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                      alt={result.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        <Link
                          to={`/movie-links/${result.id}/${result.title}`}
                          style={{ textDecoration: "none" }}
                        >
                          {result.title}
                        </Link>
                      </Typography>
                      <Typography>
                        {truncateSynopsis(result.overview, 350)}{" "}
                      </Typography>
                        <p>Rating: {result.vote_average}</p>
                        <button
                                onClick={() => addToWatchLater(result)}
                                disabled={isAddedToWatchLater(result)}
                            >
                                {isAddedToWatchLater(result) ? "Added" : "Add to Watch Later"}
                        </button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        {/* Your existing footer */}
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;
