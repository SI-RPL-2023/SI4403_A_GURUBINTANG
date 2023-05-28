import React, { useState } from "react";
import { listTransaksi } from "../data";
import itemError from '../asset/icon/item-error.svg';
import thumbnail from '../asset/images/item-transaksi.png';
import { useEffect } from "react";
import { getCourse } from "../controller/getCourse";

const ListTransaksi = ({arrTransaksi, id_user}) => {
    const [courses, setCourses] = useState([])
    
    const statusPembayaran = (status) => {
        if (status) {
            return 'success'
        } else {
            return 'pending'
        }
    }

    const getDetailKelas = (selectedId, state) => {
        const data = courses.find(item => item._id === selectedId)
        return data[state]
        // if(state === 'namaKelas') {
        //     return data.namaKelas
        // } else if(state === 'hargaCoretKelas') {
        //     return data.hargaCoretKelas
        // } else if(state === 'hargaAsliKelas') {
        //     return data.hargaAsliKelas
        // }
    }

    const getAllCourse = async () => {
        const data = await getCourse()
        setCourses(data)
    }
    
    useEffect(() => {
        getAllCourse()
    }, [])

    return (
        <div className="list-transaksi">
            {arrTransaksi.length === 0 ? 
            <div className="transaksi-notFound">
                <img src={itemError} alt="" />
                <h1>Kamu Tidak Memiliki Transaksi yang Dimaksud.</h1>
                <p>Cari dan beli kelas yang sesuai denganmu!</p>
            </div> :
            arrTransaksi.map((item, i) => {
                const {_id, idKelasCheckout, idUserCheckout, deadline, idMentor, isPurchased} = item
                return (
                    <div className="item-transaksi" key={i}>
                        <div className="item-transaksi__top">
                            <div className="detail-transaksi">
                                <p>Deadline pembayaran : {deadline}</p>
                                <p>No. Invoice : <span className="invoice">{_id}</span></p>
                            </div>
                            <span className={`status ${statusPembayaran(isPurchased)}`}>{statusPembayaran(isPurchased)}</span>
                        </div>
                        <div className="item-transaksi__middle">
                            <div className="middle-detail">
                                <span>Produk :</span>
                                <div>
                                    <img src={thumbnail} alt={getDetailKelas(idKelasCheckout, 'namaKelas')} />
                                    <h1 className="middle-judul">{getDetailKelas(idKelasCheckout, 'namaKelas')}</h1>
                                </div>
                            </div>
                            <div className="middle-detail">
                                <span>Harga Produk : </span>
                                <div>
                                    <h2 className="harga-coret">Rp{getDetailKelas(idKelasCheckout, 'hargaCoretKelas')}</h2>
                                    <h1 className="harga-produk">Rp{getDetailKelas(idKelasCheckout, 'hargaAsliKelas')}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="item-transaksi__bottom">
                            <span>Total Pembayaran :</span>
                            <h1 className="harga-asli">Rp{getDetailKelas(idKelasCheckout, 'hargaAsliKelas')}</h1>
                            {
                            statusPembayaran(isPurchased) === 'success' ? 
                            <a href={`/materi/${id_user}/${idKelasCheckout}`} className="item-transaksi__cta">Buka Materi</a> :
                            <a  href={`/instruksi-pembayaran/${id_user}/${idKelasCheckout}`} className="item-transaksi__cta">Instruksi Pembayaran</a>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListTransaksi