import React from "react";
import Review from "./Review";
import bag from '../asset/icon/bag.svg';
import star from '../asset/icon/star.svg';
import mentor from '../asset/images/mentor.png';
import mentor2 from '../asset/images/mentor2.png';
import { listFasilitas } from "../data";
import ListMateri from "./ListMateri";
import { useParams } from "react-router-dom";

const FiturKelas = ({id_kelas, title, tentangKelas, isPurchased, totalMateri, materi}) => {

    return (
        <div className="fiturKelas">
            <div className="fiturKelas__nav">
                <h1 className="fiturKelas__nav-title">{title}</h1>
                <ul className="fiturKelas__nav-list">
                    <li><a href="#tentang-kelas" className="fiturKelas__nav-link">Tentang Kelas</a></li>
                    <li><a href="#fasilitas" className="fiturKelas__nav-link">Fasilitas</a></li>
                    <li><a href="#kurikulum" className="fiturKelas__nav-link">Kurikulum</a></li>
                    <li><a href="#mentor" className="fiturKelas__nav-link">Mentor</a></li>
                    <li><a href="#review" className="fiturKelas__nav-link">Review</a></li>
                </ul>
                <a href={`/checkout/${id_kelas}`} className="fiturKelas__nav-cta"><img src={bag} alt="" />Beli Kelas</a>
            </div>
            <div className="fiturKelas__detail-box" id="tentang-kelas">
                <div className="fiturKelas__detail">
                    <span className="fiturKelas__softTitle">Tentang Kelas</span>
                    <h1 className="fiturKelas__title">{title}</h1>
                    <p className="fiturKelas__desc">{tentangKelas}</p>
                </div>
                <div className="fiturKelas__fasilitas" id="fasilitas">
                    <span className="fiturKelas__softTitle">Fasilitas</span>
                    <h1 className="fiturKelas__title">Banyak Fasilitas untuk Mendukung Proses Belajar!</h1>
                    <div className="fiturKelas__fasilitas-box">
                        {listFasilitas.map(({icon, desc}, i) => {
                            return (
                                <div className="fiturKelas__fasilitas-iconBox" key={i}>
                                    <img src={icon} alt="" className="fiturKelas__fasilitas-icon" />
                                    <h2 className="fiturKelas__fasilitas-desc">{desc}</h2>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="fiturKelas__materi" id="kurikulum">
                    <span className="fiturKelas__softTitle">Kurikulum</span>
                    <h1 className="fiturKelas__title">Belajar Dengan Kurikulum Terstruktur</h1>
                    <div className="fiturKelas__materi-borderBox">
                        <div className="fiturKelas__materi-box">
                            <div className="fiturKelas__materi-heading">
                                <h1>Materi Kelas</h1>
                                <h2>3 Materi</h2>
                            </div>
                            <div className="fiturKelas__materi-detail">
                                <ListMateri title={title} isPurchased={isPurchased} materi={materi} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fiturKelas__mentor" id="mentor">
                    <span className="fiturKelas__softTitle">Mentor</span>
                    <h1 className="fiturKelas__title">Mentor Berpengalaman di Bidang Ini</h1>
                    <div className="fiturKelas__mentor-box">
                        <div className="fiturKelas__mentor-profil">
                            <img src={mentor} alt="" className="fiturKelas__mentor-image" />
                            <div>
                                <h1 className="fiturKelas__mentor-nama">Handoko Tjokroamy</h1>
                                <h2 className="fiturKelas__mentor-jabatan">CEO Hallo Coding</h2>
                            </div>
                        </div>
                        <div className="fiturKelas__mentor-profil">
                            <img src={mentor2} alt="" className="fiturKelas__mentor-image" />
                            <div>
                                <h1 className="fiturKelas__mentor-nama">Sarah Hermawan</h1>
                                <h2 className="fiturKelas__mentor-jabatan">CEO Girl in Tech</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fiturKelas__review" id="review">
                    <span className="fiturKelas__softTitle">Mentor</span>
                    <div className="fiturKelas__review-heading">
                        <h1 className="fiturKelas__title">Kata Mereka tentang Kelas Ini</h1>
                        <div className="fiturKelas__review-total">
                            <img src={star} alt="" />
                            <h1>4.7<span>+</span></h1>
                            <h2>(14 Review)</h2>
                        </div>
                    </div>
                    <Review />
                    <a href="#" className="fiturKelas__review-cta">Lihat Semua Review</a>
                </div>
            </div>
        </div>
    )
}

export default FiturKelas