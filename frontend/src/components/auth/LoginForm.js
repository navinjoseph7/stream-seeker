import React, { useState } from 'react';
import './LoginForm.css';
import logo from '../../images/logo.png'


const LogInForm = ({ navigate }) => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("yay")
      setErrorMessage("Invalid user!");
      navigate('/login')
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      window.localStorage.setItem("userId", data.userId)
      navigate('/homepage');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const signup = () => {
    navigate("/signup");
  };

     return (
       <form className="login-form" onSubmit={handleSubmit}>
          <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
          </div>
         <h2>Login</h2>
         <input
           className="login-input"
           placeholder="Email"
           id="email"
           type="text"
           value={email}
           onChange={handleEmailChange}
         />
         <input
           className="login-input"
           placeholder="Password"
           id="password"
           type="password"
           value={password}
           onChange={handlePasswordChange}
         />
         <input
           role="submit-button"
           className="submit-button"
           id="submit"
           type="submit"
           value="LOG IN"
         />
         
         {errorMessage && <p className="error"> {errorMessage} </p>}

         <p>Not registered yet?</p>
         <button onClick={signup} className="signup-button">
           Sign up here!
         </button>
       </form>
     );
}

export default LogInForm;
