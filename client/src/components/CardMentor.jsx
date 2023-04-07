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
            {listMentor.map(({_id, namaMentor, descMentor, muridMentor, keahlianMentor}) => {
                return (
                    <div className='card__item' key={_id}>
                        <img src={card_mentor} alt={namaMentor} className="card__img" />
                        <div className="card__desc">
                            <h1 className="card__title">{namaMentor}</h1>
                            <p className="card__subtitle">{descMentor}</p>
                            <div className="card__kategori">
                                <div><img src={students} alt="" />{muridMentor}+</div>
                                <div><img src={bookmark} alt="" />{keahlianMentor}</div>
                            </div>
                        </div>
                        <div className="card__border"></div>
                        <a href={`/mentor/${_id}`} className="card__cta">Lihat Detail</a>
                    </div>
                )
            })}
        </div>
    )
}

export default CardMentor