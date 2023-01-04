import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default () => {

    const [selectedValue, setSelectedValue] = useState('GOPAY')
    const [nama, setNama] = useState('')
    const [jumlah, setJumlah] = useState(0)
    const [tanggal, setTanggal] = useState('')
    

    const [succed, setSucced] = useState(false);
    // const [berhasil, setBerhasil] = useState(false);

    const formBelanja = {
        user_id: localStorage.getItem("user_id"),
        nama: nama,
        tanggal: tanggal,
        jumlah: jumlah,
        pembayaran: selectedValue
    };

    useEffect(() => {
        const tanggal = formatDate(new Date())
        setTanggal(tanggal)
    }, [])

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    };
      
    function formatDate(date) {
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-') + ' ' +
            
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    };

    function selectChange(event){
        setSelectedValue(event.target.value);
    }
      
    const handleNama = (event) => {
        setNama(event.target.value);
    };

    const handleJumlah = (event) => {
        setJumlah(event.target.value);
    };


    const belanjaHandler = (event) => {
        event.preventDefault();
        console.log(selectedValue)
        console.log(formBelanja)
        axios
            .post("https://web-production-6c38.up.railway.app/belanja", formBelanja)
            .then((response) => {
            // console.log(response.data.user_id)s
            alert("Berhasil beli");
            setSucced(true);
            })
            .catch((err) => alert("terjadi kesalahan"));
    };

    if(succed){
        return <Navigate to="/table"/>
    }


    return (
        <form>
        <label>Barang</label>
        <br />
        <input type="text" value={nama} onChange={handleNama} />
        <br />
        <br />
        <label>Harga</label>
        <br />
        <input type="number" value={jumlah} onChange={handleJumlah} />
        <br />
        <br />
        <label>Pembayaran</label>
        <br />
        <select id="combobox" name="combobox" onChange={selectChange}>
            <option value="GOPAY">GOPAY</option>
			<option value="CASH">CASH</option>
			<option value="REKENING">REKENING</option>
        </select>
        <br />
        <br />
        <button type="submit" onClick={belanjaHandler}>Belanja</button>
</form>

    );
}
