import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [register, setRegister] = useState(false)

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

    const registerHandler = (event) => {
        event.preventDefault();
        console.log("Register");
        setRegister(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!username || !password) {
        setError("masukkan email dan password!");
        return;
        } else {
        console.log(login);
        axios
            .post("http://localhost:5000/login", login)
            .then((response) => {
            // console.log(response.data.user_id)s
            localStorage.setItem("user_id", JSON.parse(response.data.data.id));
            localStorage.setItem("token", response.data.token);
            console.log(response.data.token);
            console.log(response.data.data.id);
            alert("Berhasil Login");
            setIsLoggedIn(true);
            })
            .catch((err) => alert("password salah"));
        }
    };

    if (isLoggedIn){
        return <Navigate to='/table'/>;
    }

    if (register){
        return <Navigate to='/register'/>;
    }


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
            <button onClick={registerHandler} type="submit">
            Sign Up
            </button>
        </form>
        </div>
    );
};
