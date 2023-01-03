import React, { useEffect, useState } from "react";
import axios from "axios";

function Table() {

    const [pengeluaran, setPengeluaran] = useState([])
    const [tanggal, setTanggal] = useState()

    const user_id = localStorage.getItem("user_id")
    

    const getPengeluaran = async () => {
        try{
            let res = await axios.get(`https://web-production-6c38.up.railway.app/users/${user_id}/pengeluaran/${tanggal}`)
            setPengeluaran(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getPengeluaran()
    }, [tanggal])

    return (
        <div className="py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
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
            </div>
        </div>
    );
}

export default Table;
