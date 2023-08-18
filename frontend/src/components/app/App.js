import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import Homepage from '../homepage/Homepage';
import React, { useState } from 'react';
import UserProfile from '../user/UserProfile';
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
          <Route path='/users/:id' element={< UserProfile/>}/>
        </Routes>
    );
}

export default App;
