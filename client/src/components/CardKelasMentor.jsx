import React, { useState } from "react";
import bookKategori from '../asset/icon/book-kategori.svg'
import bookmark from '../asset/icon/bookmark.svg'
import kelas_1 from '../asset/images/kelas_1.png';
import { deleteCourse } from "../controller/deleteCourse";

const CardKelasMentor = ({listKelas, className, id_mentor}) => {

    const handleDelete = async (idMentor, idCourse) => {
        await deleteCourse(idMentor, idCourse)
    }

    return (
        <div className={`card ${className}`}>
            {listKelas.map(({_id, namaKelas, tentangKelas, kategoriKelas}, i) => {
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
                        <div className="card__cta-box card__cta-box--mentor">
                            <button className="card__cta card__cta-delete" onClick={() => handleDelete(id_mentor, _id)}>Delete</button>
                            <a href={`/mentor/kelas/edit/${_id}/${id_mentor}`} className="card__cta card__cta-edit">Edit</a>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default CardKelasMentor