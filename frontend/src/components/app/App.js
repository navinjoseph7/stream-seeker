import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import Homepage from '../homepage/Homepage';
import React, { useState } from 'react';
import UserProfile from '../user/UserProfile';
import WatchLater from '../watchLater/WatchLater';

import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path='/users/:id/watch-later' element={<WatchLater />} />
          <Route path='/homepage' element={<Homepage/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/users/:userId' element={<UserProfile />}/>
        </Routes>
    );
}

export default App;
