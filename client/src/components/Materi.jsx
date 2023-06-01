import React, { useState, useEffect } from "react";
import MateriSlide from "./MateriSlide";
import documentDark from '../asset/icon/document-dark.svg';
import mentor from '../asset/images/mentor.png';
import mentor2 from '../asset/images/mentor2.png';
import { useParams } from "react-router-dom";
import { getCourse } from "../controller/getCourse";
import { getCourseId } from "../controller/getCourseId";

const Materi = () => {
    const {id_user, id_kelas} = useParams()
    const [isChecked, setChecked] = useState(true)
    const [contentTitle, setContentTitle] = useState('')
    const [selectedKelas, setSelectedKelas] = useState({namaKelas: '', tentangKelas: '', introductionKelas: '', materiKelas: '', mentorKelas: ''})
    const {namaKelas, tentangKelas, introductionKelas, materiKelas, mentorKelas} = selectedKelas
    const navText = ['introduction kelas', namaKelas, 'feedback kelas']
    const [filteredContent, setFilteredContent] = useState('')

    const handleChange = e => {
        const selectedNav = e.target.value
        setChecked(false)
        if(selectedNav.includes('introduction')) {
            setFilteredContent(introductionKelas)
        } else if(selectedNav.includes('feedback')) {
            setFilteredContent('feedback')
        } else {
            setFilteredContent(materiKelas)
        }
        setContentTitle(selectedNav)
    }

    const getSpesificCourse = async () => {
        const data = await getCourseId(id_kelas)
        setSelectedKelas(data)
        setFilteredContent(data.introductionKelas)
        setContentTitle('introduction kelas')
    }

    useEffect(() => {
        getSpesificCourse()
    }, [])
    return (
        <div className="materi">
            <div className="materi__container">
                <div className="materi__heading">
                    <h1 className="materi__title">{namaKelas}</h1>
                    <h2 className="materi__subtitle">{tentangKelas}</h2>
                </div>
                <div className="materi__kelas">
                    <div className="materi__list">
                        <h1 className="materi__list-title">Materi Kelas</h1>
                        <div className="materi__list-scroll">
                            {navText.map((item, i) => {
                                return (
                                    <div className="list-item" key={i}>
                                        <input type="radio" name="kelas" id={i} value={item} hidden onChange={handleChange} />
                                        <label htmlFor={i} className={`materi__tab ${isChecked && (i === 0) ? 'label-checked' : ''}`}>
                                            <img src={documentDark} alt="" /> 
                                            <div>{item}</div>
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="materi__content-box">
                        <MateriSlide id_user={id_user} id_kelas={id_kelas} filteredContent={filteredContent} namaKelas={namaKelas}/>
                        <h1 className="materi__content-title">{contentTitle}</h1>
                        <h2 className="materi__content-titleMentor">Mentor Kelas Ini</h2>
                        <div className="materi__mentor-box">
                            <div className="materi__mentor-profil">
                                <img src={mentor} alt="" className="materi__mentor-image" />
                                <div>
                                    <h1 className="materi__mentor-nama">Handoko Tjokroamy</h1>
                                    <h2 className="materi__mentor-jabatan">CEO Hallo Coding</h2>
                                </div>
                            </div>
                            <div className="materi__mentor-profil">
                                <img src={mentor2} alt="" className="materi__mentor-image" />
                                <div>
                                    <h1 className="materi__mentor-nama">Sarah Hermawan</h1>
                                    <h2 className="materi__mentor-jabatan">CEO Girl in Tech</h2>
                                </div>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="materi__footer">
                <p className="materi__footer-copyright"><span>© 2023 Guru Bintang Team</span>. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Materi