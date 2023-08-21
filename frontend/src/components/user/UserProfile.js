import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../Navbar/Navbar"


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
            setUserInfo(data);
            setEditing(false);
        });
    };

    return(
        <>
        <Navbar/>
        { showDetails && (
        <div className='info-div'>
            <h2 className='heading'>Your Profile</h2>
            <div>
                <p className='email' data-cy="email">Email: {userInfo.email}</p>
                <p className='name' data-cy="name">Name: {userInfo.name}</p>
                { editing ? (
                    <>
                        <label htmlFor="subscriptions">Subscriptions:</label>
                        <input
                        type="text"
                        id="subscriptions"
                        value={subscriptions}
                        onChange={(e) => setSubscriptions(e.target.value)}
                        />
                        <br />
                        <label htmlFor="genres">Genres:</label>
                        <input
                        type="text"
                        id="genres"
                        value={genres}
                        onChange={(e) => setGenres(e.target.value)}
                        />
                        <br />
                        <button onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <>
                        <p className='subscriptions' data-cy="subscriptions">Subscriptions: {userInfo.subscriptions}</p>
                        <p className='genres' data-cy="genres">Genres: {userInfo.genres}</p>
                        <button onClick={handleEdit}>Edit</button>
                    </>
                )}
            </div>
        </div>
        )}
        { showError && (
            <div>
                <p>Sorry, you need to be logged in to see your profile</p>
                <a href='./login'>Go to Login</a>
            </div>
        )}
        </>
        ) 
}

export default UserProfile;
