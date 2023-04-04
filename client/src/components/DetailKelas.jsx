import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import diskon from '../asset/icon/diskon.svg';
import bookKategori from '../asset/icon/book-kategori.svg';
import bookmark from '../asset/icon/bookmark.svg';
import bag from '../asset/icon/bag.svg';
import titikBanner from '../asset/icon/titik-detail-kelas.svg';
import detailbanner from '../asset/images/detailbanner.png';
import FiturKelas from "./FiturKelas";
import Card from "./Card";
import Footer from "./Footer";
import { listKelas } from "../data";
import { getCourse } from "../controller/getCourse";


const DetailKelas = () => {
    const { id } = useParams()
    const [selectedKelas, setSelectedKelas] = useState({_id: '', namaKelas: '', tentangKelas: '', kategoriKelas: '', materiKelas: '', totalMateriKelas: '', hargaCoretKelas: '', hargaAsliKelas: '', mentorKelas: ''})
    const {namaKelas, tentangKelas, kategoriKelas, materiKelas, totalMateriKelas, hargaCoretKelas, hargaAsliKelas, mentorKelas} = selectedKelas

    const getSpesificCourse = async () => {
        const data = await getCourse()
        const kelas = data.find(item => item._id === id)
        setSelectedKelas(kelas)
    }

    useEffect(() => {
        getSpesificCourse()
    }, [])

    return (
        <div className="detailKelas">
            <div className="detailKelas__content">
                <div className="detailKelas__banner">
                    <div className="detailKelas__banner-desc">
                        <div className="diskon">
                        {hargaAsliKelas !== 0 && <img src={diskon} alt="" />}
                        {hargaAsliKelas === 0 ? 'Kelas Gratis' : 'Diskon 40%'}
                        </div>
                        <h1 className="detailKelas__title">{namaKelas}</h1>
                        <div className="detailKelas__spesifikasi">
                            <div><img src={bookKategori} alt="" />{totalMateriKelas}</div>
                            <div><img src={bookmark} alt="" />{kategoriKelas}</div>
                        </div>
                        <div className="detailKelas__price">
                            <h3>Rp{hargaCoretKelas}</h3>
                            <h2>{hargaAsliKelas === 0 ? 'Gratis' : `Rp${hargaAsliKelas}`}</h2>
                        </div>
                        <a href={`/checkout/${id}`} className="detailKelas__cta"><img src={bag} alt="" />Beli Kelas</a>
                    </div>
                    <div className="detailKelas__image-box">
                        <div className="detailKelas__rectangle"></div>
                        <img src={titikBanner} alt="" className="detailKelas__titik" />
                        <img src={detailbanner} alt="" className="detailKelas__kelas-image" />
                    </div>
                </div>
                <FiturKelas id={id} title={namaKelas} isPurchased={false} materi={materiKelas} totalMateri={totalMateriKelas} tentangKelas={tentangKelas} />
                <div className="detailKelas__cardBox kelas-suggestion">
                    <h1>Kamu Mungkin Akan Suka</h1>
                    {/* <Card listKelas={listKelas} /> */}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailKelas