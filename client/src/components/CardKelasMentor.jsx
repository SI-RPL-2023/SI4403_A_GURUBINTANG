import React, { useState } from "react";
import bookKategori from '../asset/icon/book-kategori.svg'
import bookmark from '../asset/icon/bookmark.svg'
import kelas_1 from '../asset/images/kelas_1.png';

const CardKelasMentor = ({listKelas, className}) => {
    // const handleClick = (i) => {
    //     const cards = [...document.querySelectorAll('.card__item')]
    //     cards[i].classList.toggle('click')
    // }

    const handleDelete = id => {
        console.log(id);
    }

    return (
        <div className={`card ${className}`}>
            {listKelas.map(({_id, namaKelas, tentangKelas, kategoriKelas, totalMateriKelas}, i) => {
                return (
                    <div className='card__item' key={_id}>
                        <img src={kelas_1} alt={namaKelas} className="card__img" />
                        <div className="card__desc">
                            <h1 className="card__title">{namaKelas}</h1>
                            <p className="card__subtitle">{tentangKelas.slice(0, 100)}...</p>
                            <div className="card__kategori">
                                <div><img src={bookKategori} alt="" />{totalMateriKelas}</div>
                                <div><img src={bookmark} alt="" />{kategoriKelas}</div>
                            </div>
                        </div>
                        <div className="card__border"></div>
                        <div className="card__cta-box card__cta-box--mentor">
                            <button className="card__cta card__cta-delete" onClick={() => handleDelete(_id)}>Delete</button>
                            <a href={`/mentor/kelas/edit/${_id}`} className="card__cta card__cta-edit">Edit</a>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CardKelasMentor