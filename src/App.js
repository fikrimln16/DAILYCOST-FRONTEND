import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = {
    email: username,
    password: password,
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const register = (event) => {
    event.preventDefault();
    console.log("Register");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("masukkan email dan password!");
      return;
    } else {
      console.log(login);
      axios
        .post("https://web-production-6c38.up.railway.app/users/login", login)
        .then((response) => {
          // console.log(response.data.user_id)s
          localStorage.setItem("user_id", JSON.parse(response.data.user_id));
          alert("Berhasil Login")
        })
        .catch((err) => alert("password salah"));
    }
  };

  return (
    <div className="container">
      <form>
        <label>
          Username
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        {error && <p>{error}</p>}
        <button onClick={handleSubmit} type="submit">
          Log In
        </button>
        <button onClick={register} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
