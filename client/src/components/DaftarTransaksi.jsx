import React, { useState, useEffect } from "react";
import ListTransaksi from "./ListTransaksi";
import { getUserCheckout } from "../controller/getUserCheckout";
import { useParams } from "react-router-dom";

const DaftarTransaksi = () => {
    const {id_user} = useParams()
    const [transaksi, setTransaksi] = useState([])
    const [filteredTransaksi, setFilteredTransaksi] = useState([])
    const [isChecked, setChecked] = useState(true)

    const filterValue = (statusBayar) => {
        let tempTransaksi = []
        if(statusBayar === 'all') {
            tempTransaksi = transaksi
        } else if(statusBayar === 'berhasil') {
            tempTransaksi = transaksi.filter(item => item.isPurchased === true)
        } else if(statusBayar === 'menunggu') {
            tempTransaksi = transaksi.filter(item => item.isPurchased === false)
        }
        setFilteredTransaksi(tempTransaksi)
    }
    
    const handleChange = e => {
        setChecked(false)
        filterValue(e.target.value)
    }

    const fetchCheckoutUser = async () => {
        const userCheckout = await getUserCheckout(id_user)
        setFilteredTransaksi(userCheckout)
        setTransaksi(userCheckout)
    }

    useEffect(() => {
        fetchCheckoutUser()
    }, [])

    return (
        <div className="transaksi">
            <h1 className="transaksi__title">Daftar Transaksi</h1>
            <div className="transaksi__box">
                <div className="transaksi__nav">
                    <div className="tab-group">
                        <input type="radio" id='all' name='tab' value='all' onChange={handleChange} hidden />
                        <label className={`transaksi__tab ${isChecked && 'transaksi__tab-checked'}`} htmlFor="all">Semua Transaksi</label>
                    </div>
                    <div className="tab-group">
                        <input type="radio" id='berhasil' name='tab' value='berhasil' onChange={handleChange} hidden />
                        <label className="transaksi__tab" htmlFor="berhasil">Transaksi Berhasil</label>
                    </div>
                    <div className="tab-group">
                        <input type="radio" id='menunggu' name='tab' value='menunggu' onChange={handleChange} hidden />
                        <label className="transaksi__tab" htmlFor="menunggu">Menunggu Pembayaran</label>
                    </div>
                    {/* <div className="tab-group">
                        <input type="radio" id='dibatalkan' name='tab' value='dibatalkan' onChange={handleChange} hidden />
                        <label className="transaksi__tab" htmlFor="dibatalkan">Dibatalkan</label>
                    </div> */}
                </div>
                <ListTransaksi arrTransaksi={filteredTransaksi} id_user={id_user} />
            </div>
        </div>
    )
}

export default DaftarTransaksi