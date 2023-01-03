import React, { useState } from 'react';
import userID from './App'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const registerHandler = (event) => {
    event.preventDefault();
    console.log("Register")
    console.log(userID)
  };

  return (
    <form>
      <label>
        Nama:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <br />
      <button type="submit" onClick={registerHandler}>Kirim</button>
    </form>
  );
}

export default Register;
