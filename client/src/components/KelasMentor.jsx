import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import plus from '../asset/icon/plus.svg'
import { getCourse } from "../controller/getCourse"
import CardKelasMentor from "./CardKelasMentor"

const KelasMentor = () => {
    const {id_mentor} = useParams()
    const [isLoad, setLoad] = useState(true)
    const [courses, setCourses] = useState([])

    const getAllCourse = async () => {
        const data = await getCourse()
        const mentorCourses = data.filter(item => item.idMentor === id_mentor)
        setCourses(mentorCourses)
    }

    useEffect(() => {
        getAllCourse()
    }, [])

    return (
        <div className="kelas-mentor">
            <div className="form-header">
                <h1 className="form-title">Daftar Kelas</h1>
                <p className="form-redirect">List kelas yang berhasil dipublish</p>
            </div>
            <CardKelasMentor listKelas={courses} id_mentor={id_mentor} />
            <a href={`/mentor/kelas/add/${id_mentor}`} className="kelas-mentor__add">
                <img src={plus} alt="" />
            </a>
        </div>
    )
}

export default KelasMentor