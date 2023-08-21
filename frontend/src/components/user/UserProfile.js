import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const UserProfile = () => {
    const [userInfo, setUserInfo] = useState([])
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { userId } = useParams();
    console.log(userId)

    useEffect( () => {
        if(token) {
            fetch(`/users/${userId}`, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            .then (response => response.json())
            .then( async data => {
                window.localStorage.setItem("token", token);
                setToken(window.localStorage.getItem("token"));
                setUserInfo(data);
                console.log(userInfo)
            })
        } 
    }, [])     

    return(
        <>
        <div className='info-div'>
        <h2 className='heading'>Your Profile</h2>
        <div>
            <div>
                <p className='email' data-cy="email">Email: {userInfo.email}</p>
                <p className='name' data-cy="name">Name: {userInfo.name}</p>
                <p className='subscriptions' data-cy="subscriptions">Subscriptions: {userInfo.subscriptions}</p>
                <p className='genres' data-cy="genres">Genres: {userInfo.genres}</p>
            </div>
        </div>
        {/* <a href="/posts">Go back to homepage </a> */}
        </div>
        </>
        ) 
}

export default UserProfile;
