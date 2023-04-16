import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const registerHandler = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("masukkan data!");
      return;
      } else {
      console.log(formData);
      axios
          .post("http://localhost:5000/register", formData)
          .then((response) => {
          console.log(response.data.message);
          // localStorage.setItem("user_id", JSON.parse(response.data.id));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_id", response.data.data.id);
          alert("Berhasil membuat akun!");
          setBerhasil(true);
          })
          .catch((err) => alert(err));
      }
  };

  if (berhasil){
    return <Navigate to='/topup'/>;
}

  return (
    <form>
      <label>
        name:
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
      {error && <p>{error}</p>}
      <button type="submit" onClick={registerHandler}>Daftar</button>
    </form>
  );
}
