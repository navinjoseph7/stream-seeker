import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [subscriptions, setSubscriptions] = useState([]); // New state variable for subscriptions
  const [genres, setGenres] = useState([]); // New state variable for genres

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: name, email: email, password: password , subscriptions: subscriptions, genres:genres})
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleSubscriptionChange = (event) => {
    const subscription = event.target.value;
    if (event.target.checked) {
      setSubscriptions((prevSubscriptions) => [...prevSubscriptions, subscription]);
    } else {
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((sub) => sub !== subscription)
      );
    }
  };
  const handleGenreChange = (event) => {
    const genre = event.target.value;
    if (event.target.checked) {
      setGenres((prevGenres) => [...prevGenres, genre]);
    } else {
      setGenres((prevGenres) =>
        prevGenres.filter((g) => g !== genre)
      );
    }
  };


    return (
      <form onSubmit={handleSubmit}>
          <h1>SignUp Page</h1>
          <input placeholder="Name" id="name" type='text' value={ name } onChange={handleNameChange} />
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <div>
    <h4>Choose Subscriptions:</h4>
    <label>
      <input type="checkbox" value="Netflix" onChange={handleSubscriptionChange} />
      Netflix
    </label>
    <label>
      <input type="checkbox" value="Amazon Prime" onChange={handleSubscriptionChange} />
      Amazon Prime
    </label>
    {/* Add more platforms here */}
  </div>
  <div>
    <h4>Choose Genres:</h4>
    <label>
      <input type="checkbox" value="Action" onChange={handleGenreChange} />
      Action
    </label>
    <label>
      <input type="checkbox" value="Drama" onChange={handleGenreChange} />
      Drama
    </label>
    {/* Add more genres here */}
  </div>
  
        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;