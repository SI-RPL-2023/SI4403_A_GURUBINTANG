import React, { useState } from "react";
import itemError from '../asset/icon/item-error.svg';

const ListKelas = ({arrKelas, cookies, notFoundState = 'progress'}) => {
    return (
        <div className="item-kelas">
            {arrKelas.length === 0 ? 
            <div className="kelas-notFound">
                <img src={itemError} alt="" />
                <h1>Kamu Belum {notFoundState == 'progress' ? 'Memulai' : 'Menyelesaikan'} Kelas Apapun.</h1>
                <p>Belum ada kelas yang kamu {notFoundState == 'progress' ? 'mulai' : 'selesaikan'}. {notFoundState == 'progress' ? 'Mulai' : 'Selesaikan'} kelas dan ambil sertifikasi untuk meningkatkan value-mu!</p>
            </div> : 
            arrKelas.map(({thumbnail, judul, progress, state}, i) => {
                return (
                    <div className="item" key={i}>
                        <div className="item__top">
                            <img className="item__thumbnail" src={thumbnail} alt="" />
                            <div className="item__detail">
                                <h1 className="item__judul">{judul}</h1>
                                {state === 'selesai' && <span className="passed">Lulus</span> }
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
                                {state === 'selesai' && <a href={`/materi/${cookies.id}/642c480bc15b3a4e7e408105`} className="item__cta-secondary">Review Materi</a>}                
                                <a href={state === 'selesai' ? '#' : `/materi/${cookies.id}/642c480bc15b3a4e7e408105`} className="item__cta-primary">{state === 'selesai' ? 'Lihat Sertifikat' : 'Mulai Belajar'}</a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListKelas