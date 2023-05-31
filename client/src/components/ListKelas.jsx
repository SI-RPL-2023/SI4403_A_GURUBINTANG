import React, { useState } from "react";
import itemError from '../asset/icon/item-error.svg';
import thumbnail from '../asset/images/kelas-dashboard1.png';

const ListKelas = ({arrKelas, getDetailKelas, id_user, notFoundState}) => {
    return (
        <div className="item-kelas">
            {arrKelas.length === 0 ? 
            <div className="kelas-notFound">
                <img src={itemError} alt="" />
                <h1>Kamu Belum {notFoundState == 'progress' ? 'Memulai' : 'Menyelesaikan'} Kelas Apapun.</h1>
                <p>Belum ada kelas yang kamu {notFoundState == 'progress' ? 'mulai' : 'selesaikan'}. {notFoundState == 'progress' ? 'Mulai' : 'Selesaikan'} kelas dan ambil sertifikasi untuk meningkatkan value-mu!</p>
            </div> : 
            arrKelas.map(({_id, idKelas, status}) => {
                const {namaKelas} = getDetailKelas(idKelas)
                return (
                    <div className="item" key={_id}>
                        <div className="item__top">
                            <img className="item__thumbnail" src={thumbnail} alt="" />
                            <div className="item__detail">
                                <h1 className="item__judul">{namaKelas}</h1>
                                {status === 1 && <span className="passed">Lulus</span> }
                                {/* <div className="item__progress">
                                    <div className="progress-detail">
                                        <div className="progress-bar">
                                            <span className="progress-bar-number" style={{width: `${progress}%`}}></span>
                                        </div>
                                        <p className="progress-percentage">{progress}%</p>
                                    </div>
                                    <p className="progress-materi">9 / 11 materi</p>
                                </div> */}
                            </div>
                        </div>
                        <div className="item__bottom">
                            <div className="item__cta-box">
                                {status === 1 && <a href={`/materi/${id_user}/${idKelas}`} className="item__cta-secondary">Review Materi</a>}                
                                <a href={status === 1 ? '#' : `/materi/${id_user}/${idKelas}`} className="item__cta-primary">{status === 1 ? 'Lihat Sertifikat' : 'Mulai Belajar'}</a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListKelas