import React, {useState} from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Import React Router modules
import MovieLinks from "../movielinks/MovieLinks";
import '../homepage/Homepage.css'
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


   const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

   const defaultTheme = createTheme();

const Homepage = () => {
    // const [searchResults, setSearchResults] = useState([]);
    // const [title, setTitle] = useState("");
    // const [showResults, setShowResults] = useState(false)


    // const handleSearch = async () => {
    //     try {
    //         const response = await fetch(`/homepage/bytitle/${title}`);
    //         const data = await response.json();
    //         setSearchResults(data); // data is an array, no need for []
    //         setShowResults(true)
    //     } catch (error) {
    //         console.error("Error fetching search results: ", error)
    //     }
    // };

 

    return (
      // <div className="main-homepage-div">
      //   <h1 id="heading">Search for a movie or tv show title</h1>
      //   <input
      //     type="text"
      //     placeholder="Enter a title"
      //     value={title}
      //     onChange={(event) => setTitle(event.target.value)}
      //   />
      //   <button onClick={handleSearch}>Search</button>
      //   {showResults && (
      //     <div>
      //       <h2>Search Results</h2>
      //       <div>
      //         {searchResults.map((result, index) => (
      //           <div key={index}>
      //             <Link to={`/movie-links/${result.id}/${result.title}`} style={{ textDecoration: 'none' }}><h2>{result.title}</h2></Link>
      //             <p>Synopsis: {result.overview}</p>
      //             <div className="poster-container">
      //               <img
      //                 className="poster-image"
      //                 src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} // poster_path is null in some movies
      //                 alt={result.title}
      //               />
      //             </div>
      //             <p>Rating: {result.vote_average}</p>

      //           </div>
      //         ))}
      //       </div>
      //     </div>
      //   )}
      // </div>

      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Album layout
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
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
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Album layout
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">Main call to action</Button>
                <Button variant="outlined">Secondary action</Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Heading
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
        </Box>
        {/* End footer */}
      </ThemeProvider>

      // <>
      //   <p>Sample text</p>
      // </>
    );
  }
export default Homepage;
