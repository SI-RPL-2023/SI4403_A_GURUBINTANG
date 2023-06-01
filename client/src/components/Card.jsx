import React, { useState } from "react";
import bookKategori from '../asset/icon/book-kategori.svg'
import bookmark from '../asset/icon/bookmark.svg'
import kelas_1 from '../asset/images/kelas_1.png';

const Card = ({listKelas, className}) => {
    return (
        <div className={`card ${className}`}>
            {listKelas.map(({_id, namaKelas, tentangKelas, kategoriKelas, materiKelas, totalMateriKelas, hargaCoretKelas, hargaAsliKelas, mentorKelas}, i) => {
                return (
                    <div className='card__item' key={_id}>
                        <img src={kelas_1} alt={namaKelas} className="card__img" />
                        <div className="card__desc">
                            <h1 className="card__title">{namaKelas}</h1>
                            <p className="card__subtitle">{tentangKelas.slice(0, 100)}...</p>
                            <div className="card__kategori">
                                <div><img src={bookKategori} alt="" />3</div>
                                <div><img src={bookmark} alt="" />{kategoriKelas}</div>
                            </div>
                        </div>
                        <div className="card__border"></div>
                        <div className="card__cta-box">
                            <div className="card__price">
                                <h3 className="card__price-stroke">Rp{hargaCoretKelas}</h3>
                                <h2 className="card__price-real">{hargaAsliKelas === 0 ? 'Gratis' : `Rp${hargaAsliKelas}`}</h2>
                            </div>
                            <a href={`/kelas/${_id}`} className="card__cta">Lihat Detail</a>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Card