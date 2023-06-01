import React, { useState } from "react";
import bookKategori from '../asset/icon/book-kategori.svg'
import bookmark from '../asset/icon/bookmark.svg'
import students from '../asset/icon/students.svg'
import card_mentor from '../asset/images/card_mentor.png';

const CardMentor = ({listMentor}) => {
    // const handleClick = (i) => {
    //     const cards = [...document.querySelectorAll('.card__item')]
    //     cards[i].classList.toggle('click')
    // }

    return (
        <div className='card card-mentor'>
            {listMentor.map(({_id, namaMentor, jumlahKelas}) => {
                return (
                    <div className='card__item' key={_id}>
                        <img src={card_mentor} alt={namaMentor} className="card__img" />
                        <div className="card__desc">
                            <h1 className="card__title">{namaMentor}</h1>
                            <p className="card__subtitle">Mentor Guru Bintang yang berpengalaman untuk memberikan pembelajaran sesuai expertisenya masing-masing</p>
                            <div className="card__kategori">
                                <div><img src={bookmark} alt="" />{jumlahKelas}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CardMentor