import React, { useState } from "react";
import { listTransaksi } from "../data";
import itemError from '../asset/icon/item-error.svg';
import thumbnail from '../asset/images/item-transaksi.png';
import icon_success from '../asset/icon/icon_success.svg';
import icon_waiting from '../asset/icon/icon_waiting.svg';
import { useEffect } from "react";
import { getCourse } from "../controller/getCourse";
import { approveCheckout } from "../controller/approveCheckout";

const ListTransaksiAdmin = ({arrTransaksi, id_mentor}) => {
    const [courses, setCourses] = useState([])
    
    const statusPembayaran = (status) => {
        if (status) {
            return 'success'
        } else {
            return 'pending'
        }
    }

    const handleApprove = async (id_mentor, id_checkout) => {
        await approveCheckout(id_mentor, id_checkout)
        window.location.reload()
    }

    const getDetailKelas = (selectedId, state) => {
        const data = courses.find(item => item._id === selectedId)
        return data[state]
        // if(state === 'namaKelas') {
        //     return data[state]
        // } else if(state === 'hargaCoretKelas') {
        //     return data.hargaCoretKelas
        // } else if(state === 'hargaAsliKelas') {
        //     return data.hargaAsliKelas
        // }
    }

    const cekBuktiBayar = (bukti, isPurchased) => {
        if(!bukti && isPurchased) {
            return <img src={icon_success} alt="" className="middle-detail--bukti_img" />
        } else if(bukti) {
            return <img src={icon_success} alt="" className="middle-detail--bukti_img" />
        }
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
                <p>Promosikan kelasmu lebih menarik lagi!</p>
            </div> :
            arrTransaksi.map((item, i) => {
                const {_id, idKelasCheckout, idUserCheckout, buktiBayar, deadline, idMentor, isPurchased} = item
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
                            <div className="middle-detail middle-detail--bukti">
                                <span>Bukti Bayar: </span>
                                {buktiBayar || isPurchased ? <img src={icon_success} alt="" className="middle-detail--bukti_img" /> : <img src={icon_waiting} alt="" className="middle-detail--bukti_img" />}                               
                            </div>
                        </div>
                        <div className="item-transaksi__bottom">
                            <span>Total Pembayaran :</span>
                            <h1 className="harga-asli">Rp{getDetailKelas(idKelasCheckout, 'hargaAsliKelas')}</h1>
                            {
                            statusPembayaran(isPurchased) === 'success' ? 
                            <span className="item-transaksi__cta item-transaksi__cta--lunas">Lunas</span> :
                            <button className="item-transaksi__cta item-transaksi__cta--approve" onClick={() => handleApprove(idMentor, _id)}>Approve</button>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListTransaksiAdmin