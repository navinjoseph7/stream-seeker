import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../Navbar/Navbar"

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const UserProfile = () => {
    const [userInfo, setUserInfo] = useState([])
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { userId } = useParams();
    const [showDetails, setShowDetails] = useState(false) 
    const [showError, setShowError] = useState(false) 
    const [editing, setEditing] = useState(false);
    const [subscriptions, setSubscriptions] = useState("");
    const [genres, setGenres] = useState("");

    useEffect( () => {
        if(!token) {
            setShowError(true);
        }

        if(token) {
            fetch(`/users/${userId}`, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            .then (response => response.json())
            .then( async data => {
                window.localStorage.setItem("token", token);
                setToken(window.localStorage.getItem("token"));
                setUserInfo(data);
                setSubscriptions(data.subscriptions)
                setGenres(data.genres)
                setShowDetails(true);
            })
        } 
    }, [])     

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        const updatedData = {
        subscriptions: subscriptions,
        genres: genres,
        };

        fetch(`/users/${userId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
        })
        .then((response) => response.json())
        .then((data) => {
            setUserInfo(data.user);
            setToken(data.token)
            setEditing(false);
        });
    };

     return (
       <>
         <Navbar />
         {showDetails && (
           <Container sx={{ textAlign: "center", my: 4 }}>
             <Typography variant="h4" gutterBottom>
               Your Profile
             </Typography>
             <Box>
               <Typography variant="body1" data-cy="email" pb={1}>
                 Email: {userInfo.email}
               </Typography>
               <Typography variant="body1" data-cy="name" pb={1}>
                 Name: {userInfo.name}
               </Typography>
               {editing ? (
                 <>
                   <Typography
                     variant="body1"
                     component="label"
                     htmlFor="subscriptions"
                     pr={2}
                   >
                     Subscriptions:
                   </Typography>
                   <input
                     type="text"
                     id="subscriptions"
                     value={subscriptions}
                     onChange={(e) => setSubscriptions(e.target.value)}
                   />
                   <br />

                   <Typography
                     variant="body1"
                     component="label"
                     htmlFor="genres"
                     pr={2}
                   >
                     Genres:
                   </Typography>
                   <input
                     type="text"
                     id="genres"
                     value={genres}
                     onChange={(e) => setGenres(e.target.value)}
                   />
                   <br />
                   <Box pt={2}>
                     <Button variant="contained" onClick={handleSave}>
                       Save
                     </Button>
                   </Box>
                 </>
               ) : (
                 <>
                   <Typography variant="body1" data-cy="subscriptions">
                     Subscriptions: {subscriptions}
                   </Typography>
                   <Typography variant="body1" data-cy="genres">
                     Genres: {genres}
                   </Typography>
                   <Box pt={2}>
                     <Button variant="contained" onClick={handleEdit}>
                       Edit
                     </Button>
                   </Box>
                 </>
               )}
             </Box>
           </Container>
         )}
         {showError && (
           <Container sx={{ textAlign: "center", my: 4 }}>
             <Typography variant="body1">
               Sorry, you need to be logged in to see your profile
             </Typography>
             <Button variant="contained" href="/login">
               Go to Login
             </Button>
           </Container>
         )}
       </>
     );
}

export default UserProfile;