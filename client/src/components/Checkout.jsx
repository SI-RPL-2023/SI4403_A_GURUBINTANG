import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "./Card";
import leftArr from '../asset/icon/leftArrow.svg';
import trash from '../asset/icon/trash.svg';
import kelas_1 from '../asset/images/kelas_1.png';
import bookKategori from '../asset/icon/book-kategori.svg'
import bookmark from '../asset/icon/bookmark.svg'
import AlertLeave from "./AlertLeave";
import Payment from "./Payment";
import { getCourse } from "../controller/getCourse";
import { getCourseId } from "../controller/getCourseId";

const Checkout = ({cookies}) => {
    const navigate = useNavigate()
    const { id_kelas } = useParams()
    const [course, setCourse] = useState([])
    const [diskon, setDiskon] = useState('')
    const [isLeave, setLeave] = useState(false)
    const [isPay, setPay] = useState(false)
    const [checkoutKelas, setCheckoutKelas] = useState({namaKelas: '', tentangKelas: '', kategoriKelas: '', totalMateriKelas: '', hargaCoretKelas: '', hargaAsliKelas: '', idMentor: ''})
    const {namaKelas, tentangKelas, kategoriKelas, hargaCoretKelas, hargaAsliKelas, idMentor} = checkoutKelas

    const handleOverlay = () => {
        setLeave(false)
        setPay(false)
        document.body.classList.toggle('fixBody')
    }
    
    const handleLeavingPage = () => {
        navigate(-1)
    }
    
    const alertLeavingPage = () => {
        setLeave(!isLeave)
        document.body.classList.toggle('fixBody')
    }

    const handlePaymentPopUp = () => {
        setPay(!isPay)
        document.body.classList.toggle('fixBody')
    }

    const handleDiskon = e => {
        setDiskon(e.target.value)
    }

    const alertProps = {
        isLeave,
        handleLeavingPage,
        alertLeavingPage
    }

    const paymentProps = {
        cookies,
        id_kelas,
        idMentor,
        isPay,
        hargaAsliKelas,
        handlePaymentPopUp
    }

    const fetchCheckoutClass = async () => {
        const data = await getCourse()
        const kelas = await getCourseId(id_kelas)
        setCheckoutKelas(kelas)
        setCourse(data)
    }

    useEffect(() => {
        fetchCheckoutClass()
    }, [])

    return (
        <div className="checkout">
            <div className="checkout__nav">
                <button className="checkout__back" type="button" onClick={alertLeavingPage}><img src={leftArr} alt=""/></button>
                <h1 className="checkout__title">Checkout</h1>
            </div>
            <div className="checkout__content">
                <div className="checkout__item">
                    <img className="checkout__item-image" src={kelas_1} alt="" />
                    <div className="checkout__item-detail">
                        <div className="checkout__item-heading">
                            <h1 className="checkout__item-title">{namaKelas}</h1>
                            <img src={trash} alt="" className="checkout__item-delete" />
                        </div>
                        <p className="checkout__item-desc">{`${tentangKelas.slice(0,120)}...`}</p>
                        <div className="checkout__item-spec">
                            <div className="checkout__item-kategori">
                                <div><img src={bookKategori} alt="" />3</div>
                                <div><img src={bookmark} alt="" />{kategoriKelas}</div>
                            </div>
                            <div className="checkout__item-harga">
                                <h3 className="checkout__item-harga-coret">Rp{hargaCoretKelas}</h3>
                                <h2 className="checkout__item-harga-asli">{hargaAsliKelas === 0 ? 'Gratis' : `Rp${hargaAsliKelas}`}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout__pembayaran">
                    <form className="checkout__form">
                        <div className="checkout__form-harga">
                            <span>Harga Produk</span>
                            <span>Rp{hargaAsliKelas}</span>
                        </div>
                        <div className="checkout__form-diskon">
                            <span>Kode Diskon</span>
                            <div>
                                <input type="text" value={diskon} name='diskon' onChange={handleDiskon} autoComplete='off' />
                                <button type="button">Pakai</button>
                            </div>
                        </div>
                        <div className="checkout__form-totalDiskon">
                            <span>Diskon</span>
                            <span>Rp 0</span>
                        </div>
                        <div className="checkout__form-totalBayar">
                            <span>Total Pembayaran</span>
                            <span>Rp{hargaAsliKelas}</span>
                        </div>
                        <button type="button" className="checkout__form-button" onClick={handlePaymentPopUp}>Lanjut ke Pembayaran</button>
                    </form>
                </div>
            </div>
            <div className="checkout__cardBox kelas-suggestion">
                <h1>Kamu Mungkin Akan Suka</h1>
                <Card listKelas={course.slice(0,4)} />
            </div>
            <div className={`overlay ${(isLeave || isPay) && 'popUp'}`} onClick={handleOverlay}></div>
            <AlertLeave {...alertProps}   />
            <Payment {...paymentProps} />
        </div>
    )
}

export default Checkout