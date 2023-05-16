import React from 'react';
import success from '../asset/images/payment_success.png';
import icon_waiting from '../asset/icon/icon_waiting.svg';
import { useParams } from 'react-router-dom';

const WaitingPayment = () => {
    const {id_user, id_kelas} = useParams()

    return (
        <div className="waiting-payment">
            <div className="waiting__container">
                <div className="waiting__banner">
                    <img src={success} alt="" className='waiting__kelas' />
                    <img src={icon_waiting} alt="" className='waiting__icon' />
                </div>
                <h1 className="waiting__title">Pembelian Kelas ini Berhasil!</h1>
                <h2 className="waiting__subtitle">Kamu telah berhasil melakukan pembelian. Selamat belajar dan tetap semangat. Mulai belajar sekarang!</h2>
                <div className="waiting__cta-box">
                    <a href="/materi" className="waiting__cta-primary">Mulai Belajar</a>
                    <a href="/dashboard/transaksi" className="waiting__cta-secondary">Lihat Detail Transaksi</a>
                </div>
            </div>
        </div>
    )
}

export default WaitingPayment