import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default () => {
    const [pengeluaran, setPengeluaran] = useState([])
    const [saldo, setSaldo] = useState([])
    const [tanggal, setTanggal] = useState()
    const [logOut, setLogOut] = useState(false)
    const [belanja, setBelanja] = useState(false)

    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("token")

    

    const getSaldo = async () => {
        try{
            let res = await axios.get(`http://localhost:5000/user/saldo/${user_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            setSaldo(res.data.results)
            console.log(saldo)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getPengeluaran = async () => {
        try{
            let res = await axios.get(`http://localhost:5000/user/pengeluaran/${user_id}/list/${tanggal}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            setPengeluaran(res.data.results)
            console.log(res.data.results)
            console.log(tanggal)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getPengeluaran()
        getSaldo()
        console.log(token)
    }, [tanggal])

    const LogOut = (event) => {
        event.preventDefault();
        setLogOut(true);
        localStorage.clear();
    };

    const Belanja = (event) => {
        event.preventDefault();
        setBelanja(true)
    };

    if (logOut){
        return <Navigate to='/'/>;
    }

    if (belanja){
        return <Navigate to='/belanja'/>;
    }


    return (
        <div className="py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>GOPAY</th>
                                    <th>CASH</th>
                                    <th>REKENING</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    saldo.map((saldouser,index) => {
                                        return (
                                            <tr key={index}> 
                                                <td>{saldouser.uang_gopay}</td>
                                                <td>{saldouser.uang_cash}</td>
                                                <td>{saldouser.uang_rekening}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <h5>Pilih tanggal yang ingin dilihat pada tabel dibawah!</h5>
                        <input type="date" name="tanggal" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="form-control"/>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Tanggal</th>
                                    <th>Harga</th>
                                    <th>Pembayaran</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pengeluaran.map((pengeluarans,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{pengeluarans.nama}</td>
                                                <td>{pengeluarans.tanggal}</td>
                                                <td>{pengeluarans.jumlah}</td>
                                                <td>{pengeluarans.pembayaran}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <button className="bg-dark" onClick={Belanja} type="submit">
                Belanja
            </button>
            <button onClick={LogOut} type="submit">
                LogOut
            </button>
            
            </div>
        </div>
    );
}

