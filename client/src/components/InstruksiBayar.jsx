import React, { useState, useEffect } from "react";
import Countdown from 'react-countdown';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import leftArr from '../asset/icon/leftArrow.svg';
import mandiri from '../asset/images/mandiri.png';
import bca from '../asset/images/bca.png';
import bni from '../asset/images/bni.png';
import CaraBayar from "./CaraBayar";
import { useParams } from "react-router-dom";
import { getCourse } from "../controller/getCourse";


const InstruksiBayar = () => {
    const {id_user, id_kelas} = useParams()
    const [isCopied, setCopied] = useState(false)
    const [kelasBayar, setKelasBayar] = useState({namaKelas: '', hargaAsliKelas: ''})
    let logoBank = ''
    let metodeBayar = ''
    const countdown = localStorage.getItem('countdown')
    const dueTime = localStorage.getItem('dueTime')
    const bank = localStorage.getItem('bank')
    const {namaKelas, hargaAsliKelas} = kelasBayar

    const handleLogoBank = (logo) => {
        if(bank.toLocaleLowerCase().includes('mandiri')) {
            logoBank = mandiri
            metodeBayar = 'Mandiri'
        } else if(bank.toLocaleLowerCase().includes('bca')) {
            logoBank = bca
            metodeBayar = 'BCA'
        } 
        else {
            logoBank = bni
            metodeBayar = 'BNI'
        }
        return logoBank
    }

    const fetchCheckoutClass = async () => {
        const data = await getCourse()
        const kelas = data.find(item => item._id === id_kelas)
        setKelasBayar(kelas)
    }


    useEffect(() => {
        fetchCheckoutClass()
        setTimeout(() => setCopied(false), 1500)
    }, [isCopied])

    const handleCopyAnimation = () => {
        setCopied(true)
    }

    return (
        <div className="instruksi">
            <div className="instruksi__nav">
                <button className="instruksi__back" type="button" ><img src={leftArr} alt=""/></button>
                <h1 className="instruksi__title">Instruksi Pembayaran</h1>
            </div>
            <div className="instruksi__heading">
                <h1 className="instruksi__info">Selesaikan Pembayaran Dalam</h1>
                <div className="instruksi__countdown">
                    <Countdown date={+countdown}>
                        <h1 className="instruksi__info-timeout">Waktu pembayaran telah habis</h1>
                    </Countdown>
                </div>
                <span className="instruksi__batas-akhir">Batas akhir pembayaran :</span>
                <h2 className="instruksi__batas-bayar">{dueTime}</h2>
            </div>
            <div className="instruksi__bank">
                <div className="instruksi__nama-bank">
                    <h1>{localStorage.getItem('bank')}</h1>
                    <img src={handleLogoBank()} alt="" />
                </div>
                <div className="instruksi__kelas">
                    <div>
                        <span>Nama Kelas</span>
                        <h2>{namaKelas}</h2>
                    </div>
                </div>
                <div className="instruksi__va">
                    <div>
                        <span>Nomor Virtual Account</span>
                        <h2>12345678096354372</h2>
                    </div>
                    <CopyToClipboard text={'12345678096354372'}>
                        <button type="button" className="instruksi__copy-va" onClick={handleCopyAnimation}>{isCopied ? 'Copied!' : 'Salin'}</button>
                    </CopyToClipboard>
                </div>
                <div className="instruksi__total">
                    <span>Total Pembayaran</span>
                    <h2>Rp{hargaAsliKelas}</h2>
                </div>
            </div>
            <CaraBayar metodeBayar={metodeBayar} />
            <div className="instruksi__buktibayar">
                <h1>Upload Bukti Bayar</h1>
                <form>
                    <div>
                        <input type="file" name="bukti_bayar" id="bukti_bayar" accept="image/png, image/jpg, image/jpeg" required/>
                    </div>
                    <button className="instruksi__buktibayar-cta">Upload</button>        
                    <a href="" className="instruksi__cta">Lihat Riwayat Transaksi</a>
                </form>
            </div>
        </div>
    )
}

export default InstruksiBayar