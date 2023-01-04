import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default () => {
  const [formData, setFormData] = useState({
    nama: '',
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
    if (!formData.nama || !formData.email || !formData.password) {
      setError("masukkan data!");
      return;
      } else {
      console.log(formData);
      axios
          .post("https://web-production-6c38.up.railway.app/users", formData)
          .then((response) => {
          // console.log(response.data.user_id)s
          // localStorage.setItem("user_id", JSON.parse(response.data.user_id));
          alert("Berhasil membuat akun!");
          localStorage.setItem("email", formData.email);
          localStorage.setItem("password", formData.password);
          setBerhasil(true);
          })
          .catch((err) => alert("tidak bisa!"));
      }
  };

  if (berhasil){
    return <Navigate to='/topup'/>;
}

  return (
    <form>
      <label>
        Nama:
        <input type="text" name="nama" value={formData.nama} onChange={handleChange} />
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
