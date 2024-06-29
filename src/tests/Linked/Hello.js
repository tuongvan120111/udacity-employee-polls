// src/HelloWorld.js

import React from "react";
// import "./hello.css";

function HelloWorld() {
  // Function to handle the login button click

  const handleLogin = () => {
    alert("Login button clicked!");

    // You can add your login logic here
  };

  return (
    <div>
      <h1>Hello, World!</h1>

      <p>This is a simple React app.</p>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default HelloWorld;
