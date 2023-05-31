import React, { useEffect, useState } from "react";
import ListKelas from "./ListKelas";
import back from '../asset/icon/back.svg';
import { getCourseUser } from "../controller/getCourseUser";
import { useParams } from "react-router-dom";
import { getCourse } from "../controller/getCourse";

const SemuaKelasUser = ({cookies}) => {
    const {id_user} = useParams()
    const [filteredKelas, setFilteredKelas] = useState([])
    const [dataKelas, setDataKelas] = useState([])
    const [kelasProgress, setKelasProgress] = useState([])
    const [kelasSelesai, setKelasSelesai] = useState([])
    const [isChecked, setChecked] = useState(true)
    const [notFoundState, setNotFoundState] = useState('progress')

    
    const handleChange = e => {
        setChecked(false)
        const status = +e.target.value
        if(status === 1) {
            setFilteredKelas(kelasSelesai)
            setNotFoundState('progress')
        } else {
            setFilteredKelas(kelasProgress)
            setNotFoundState('selesai')
        }
    }

    const getDetailKelas = selectedId => {
        return dataKelas.find(item => item._id === selectedId)
    }

    const fetchUserCourses = async () => {
        const allCourse = await getCourse()
        const data = await getCourseUser(id_user)
        const dataProgres = data.filter(item => item.status === 0)
        const dataSelesai = data.filter(item => item.status === 1)
        setDataKelas(allCourse)
        setKelasProgress(dataProgres)
        setKelasSelesai(dataSelesai)
        setFilteredKelas(dataProgres)
    }

    useEffect(() => {
        fetchUserCourses()
    }, [])

    return(
        <div className="allkelas">
            <div className="allkelas__nav">
                <a className="allkelas__back" href="/"><img src={back} alt="" /> kembali</a>
                <div className="allkelas__tab-box">
                    <div className="tab-group">
                        <input type="radio" id='progress' name='tab' value='0' onChange={handleChange} hidden />
                        <label className={`allkelas__tab ${isChecked && 'allkelas-checked'}`} htmlFor="progress">Sedang Berlangsung</label>                        
                    </div>
                    <div className="tab-group">
                        <input type="radio" id='selesai' name='tab' value='1' onChange={handleChange} hidden />
                        <label className="allkelas__tab" htmlFor="selesai">Kelas Selesai</label>
                    </div>
                </div>
            </div>
            <div className="allkelas__box">
                <ListKelas arrKelas={filteredKelas} getDetailKelas={getDetailKelas} notFoundState={notFoundState} id_user={id_user} />
            </div>
        </div>
    )
}

export default SemuaKelasUser