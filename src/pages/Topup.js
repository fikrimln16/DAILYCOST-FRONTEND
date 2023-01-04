import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";


export default () => {
  const [gopay, setGopay] = useState("");
  const [rekening, setRekening] = useState("");
  const [cash, setCash] = useState("");
  const [error, setError] = useState("");
  const [berhasilIsi, setBerhasilIsi] = useState(false)


  const data = {
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password"),
};

  const handleGopayChange = (event) => {
    setGopay(event.target.value);
  };

  const handleRekeningChange = (event) => {
    setRekening(event.target.value);
  };

  const handleCashChange = (event) => {
    setCash(event.target.value);
  };

  const user_depo = {
    user_id: localStorage.getItem("user_id"),
    uang_gopay: gopay,
    uang_cash: cash,
    uang_rekening: rekening,
  };

  const postDepo = (event) => {
    event.preventDefault();

    if (!gopay || !rekening || !cash) {
      setError("masukkan saldo anda!");
      return;
    } else {
      console.log(user_depo);
      axios
        .post(
          "https://web-production-6c38.up.railway.app/users/newdepo",
          user_depo
        )
        .then((response) => {
          // console.log(response.data.user_id)s
          localStorage.setItem("user_id", JSON.parse(response.data.user_id));
          alert("Berhasil input uang anda!");
          setBerhasilIsi(true);
        })
        .catch((err) => alert("password salah"));
    }
  };

  const getUserId = async () => {
    try{
      axios
      .post("https://web-production-6c38.up.railway.app/users/login", data)
      .then((response) => {
      // console.log(response.data.user_id)s
      localStorage.setItem("user_id", JSON.parse(response.data.user_id));
      // console.log(localStorage.getItem("user_id"))
      })
      .catch((err) => alert("password salah"));
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    getUserId()
  }, [])

  if (berhasilIsi){
    return <Navigate to='/'/>;
}

  return (
    <form>
      <label>
        Masukkan saldo gopay :
        <input type="text" value={gopay} onChange={handleGopayChange} />
      </label>
      <br />
      <label>
        Masukkan saldo rekening :
        <input type="text" value={rekening} onChange={handleRekeningChange} />
      </label>
      <br />
      <label>
        Masukan saldo cash :
        <input type="text" value={cash} onChange={handleCashChange} />
      </label>
      <br />
      {error && <p>{error}</p>}
      <button onClick={postDepo} type="submit">
        Input
      </button>
    </form>
  );
}

