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
        <h2 className='heading'>Account Information</h2>
        <div>
            {/* <p className='username' data-cy="username">Username: {userInfo.username}</p> */}
            <p className='email' data-cy="email">Email: {userInfo.email}</p>
        </div>
        <a href="/posts">Go back to my feed </a>
        </div>
        </>
        ) 
}

export default UserProfile;