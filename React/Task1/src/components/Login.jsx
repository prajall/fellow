import React, { useEffect, useState } from "react";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("login"));

  const handleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem("login");
      setIsLoggedIn(false);
    } else {
      localStorage.setItem("login", "true");
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn)
    return (
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    );
  else
    return (
      <button className="login-button" onClick={handleLogin}>
        Logout
      </button>
    );
};

export default Login;
