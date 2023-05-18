import React, { useEffect, useState } from "react";
import ListKelas from "./ListKelas";
import back from '../asset/icon/back.svg';
import { listDashboardKelas } from "../data";

const SemuaKelasUser = ({cookies}) => {
    const [filteredKelas, setFilteredKelas] = useState([])
    const [kelasProgress, setKelasProgress] = useState([])
    const [kelasSelesai, setKelasSelesai] = useState([])
    const [isChecked, setChecked] = useState(true)
    const [notFoundState, setNotFoundState] = useState('')

    
    const handleChange = e => {
        setChecked(false)
        if(e.target.value === 'progress') {
            setFilteredKelas(kelasProgress)
            setNotFoundState(e.target.value)
        } else {
            setFilteredKelas(kelasSelesai)
            setNotFoundState(e.target.value)
        }
    }

    useEffect(() => {
        setNotFoundState('progress')
        const progress = listDashboardKelas.filter(item => item.state === 'progress')
        const selesai = listDashboardKelas.filter(item => item.state === 'selesai')
        setKelasProgress(progress)
        setKelasSelesai(selesai)
        setFilteredKelas(progress)
    }, [])

    return(
        <div className="allkelas">
            <div className="allkelas__nav">
                <a className="allkelas__back" href="/"><img src={back} alt="" /> kembali</a>
                <div className="allkelas__tab-box">
                    <div className="tab-group">
                        <input type="radio" id='progress' name='tab' value='progress' onChange={handleChange} hidden />
                        <label className={`allkelas__tab ${isChecked && 'allkelas-checked'}`} htmlFor="progress">Sedang Berlangsung</label>                        
                    </div>
                    <div className="tab-group">
                        <input type="radio" id='selesai' name='tab' value='selesai' onChange={handleChange} hidden />
                        <label className="allkelas__tab" htmlFor="selesai">Kelas Selesai</label>
                    </div>
                </div>
            </div>
            <div className="allkelas__box">
                <ListKelas arrKelas={filteredKelas} notFoundState={notFoundState} cookies={cookies} />
            </div>
        </div>
    )
}

export default SemuaKelasUser