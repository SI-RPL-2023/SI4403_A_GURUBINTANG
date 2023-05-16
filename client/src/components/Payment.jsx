import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import close from '../asset/icon/close.svg';
import mandiri from '../asset/images/mandiri.png';
import bca from '../asset/images/bca.png';
import bni from '../asset/images/bni.png';
import moment from 'moment';
import 'moment/locale/id';

const Payment = ({id_kelas, isPay, hargaAsliKelas, handlePaymentPopUp, cookies}) => {
    const [bank, setBank] = useState('')
    const navigate = useNavigate()

    const handlePaymentSubmit = () => {
        if(hargaAsliKelas === 0) {
            navigate(`/payment/success/${cookies.id}/${id_kelas}`)
        } else {
            const tomorrow = moment().add(1, 'days')
            localStorage.setItem('countdown', (Date.now() + 86400000))
            localStorage.setItem('dueTime', tomorrow.locale('id').format('LLLL'))
            localStorage.setItem('bank', bank)
            navigate(`/instruksi-pembayaran/${cookies.id}/${id_kelas}`)
        }
        document.body.classList.toggle('fixBody')
    }

    const cekCtaIsDisabled = () => {
        return bank || hargaAsliKelas === 0 ? '' : 'disabled'
    }

    const cekInputIsDisabled = () => {
        return hargaAsliKelas === 0 ? 'disabled' : ''
    }

    const handleOptionBank = e => {
        setBank(e.target.value)
    }

    return (
        <div className={`payment ${isPay && 'popUp'}`}>
            <div className="payment__heading">
                <img src={close} alt="" className="payment__close" onClick={handlePaymentPopUp} />
                <h1 className="payment__title">Pembayaran</h1>
            </div>
            <div className="payment__metode">
                <h1>Metode Pembayaran</h1>
                <div className="payment__bank">
                    <div>
                        <div className="payment__bank-name">
                            <img src={mandiri} alt="" />
                            <h2>Mandiri Virtual Account</h2>
                        </div>
                        <input type="radio" name="bank" id="mandiri" value='Mandiri Virtual Account' hidden onChange={handleOptionBank} disabled={cekInputIsDisabled()} />
                        <label htmlFor="mandiri" className={`${cekInputIsDisabled()}`}></label>
                    </div>
                    <div>
                        <div className="payment__bank-name">
                            <img src={bca} alt="" />
                            <h2>BCA Virtual Account</h2>
                        </div>
                        <input type="radio" name="bank" id="bca" value='BCA Virtual Account' hidden onChange={handleOptionBank} disabled={cekInputIsDisabled()} />
                        <label htmlFor="bca" className={`${cekInputIsDisabled()}`}></label>
                    </div>
                    <div>
                        <div className="payment__bank-name">
                            <img src={bni} alt="" />
                            <h2>BNI Virtual Account</h2>
                        </div>
                        <input type="radio" name="bank" id="bni" value='BNI Virtual Account' hidden onChange={handleOptionBank} disabled={cekInputIsDisabled()} />
                        <label htmlFor="bni" className={`${cekInputIsDisabled()}`}></label>
                    </div>
                </div>
            </div>
            <div className="payment__ringkasan">
                <h1>Ringkasan Pembayaran</h1>
                <div className="payment__detailRingkasan">
                    <div>
                        <h2>Total Pembayaran</h2>
                        <span className="payment__hargaTotal">{hargaAsliKelas === 0 ? 'Gratis' : `Rp${hargaAsliKelas}`}</span>
                    </div>
                    <div>
                        <h2>Diskon</h2>
                        <span className="payment__hargaDiskon">Rp 0</span>
                    </div>
                </div>
            </div>
            <div className="payment__total">
                <div>
                    <h3>Total Bayar</h3>
                    <h2>{hargaAsliKelas === 0 ? 'Gratis' : `Rp${hargaAsliKelas}`}</h2>
                </div>
                <button className={`payment__cta ${cekCtaIsDisabled()}`} onClick={handlePaymentSubmit} disabled={cekCtaIsDisabled()}>Bayar</button>
            </div>
        </div>
    )
}

export default Payment