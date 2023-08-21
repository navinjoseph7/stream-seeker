import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import Homepage from '../homepage/Homepage';
import MovieLinks from '../movielinks/MovieLinks';
import React, { useState } from 'react';
// import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path='/homepage' element={<Homepage/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path="/movie-links/:movieId/:movieTitle" element={<MovieLinks navigate={ useNavigate() }/>} />
        </Routes>
    );
}

export default App;
