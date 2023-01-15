import React, { useState } from "react";


const Home = ({setIsLoggedIn}) => {

  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoggedIn(true);
    localStorage.setItem("userName", userName);
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>

      <label htmlFor="username">Username</label>

      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;
