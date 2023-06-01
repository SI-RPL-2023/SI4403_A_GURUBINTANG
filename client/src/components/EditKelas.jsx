import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { editCourse } from "../controller/editCourse"
import { getCourseId } from "../controller/getCourseId"
import FormKelas from "./FormKelas"

const EditKelas = () => {
    const navigate = useNavigate()
    const {id_kelas: idKelas, id_mentor: idMentor} = useParams()
    const [editValue, setEditValue] = useState({idKelas, idMentor, namaKelas: '', tentangKelas: '', introductionKelas: '', kategoriKelas: '', materiKelas: '', hargaCoretKelas: 0, hargaAsliKelas: 0})

    const handleChange = e => {
        setEditValue(preVal => {
            return {
                ...preVal,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const msg = await editCourse(idMentor, editValue)
        toast.success(msg)
        navigate(`/mentor/kelas/${idMentor}`)
    }

    const fetchDetailKelas = async () => {
        const data = await getCourseId(idKelas)
        setEditValue(preValue => {
            return {
                ...preValue,
                ...data
            }
        })
    }

    useEffect(() => {
        fetchDetailKelas()
    }, [])

    return (
        <div className="edit-kelas">
            <div className="form-header">
                <h1 className="form-title">Edit Kelas {editValue.namaKelas}</h1>
                <p className="form-redirect">Atur konten kelas dan update sesuai kebutuhan</p>
            </div>
            <FormKelas handleChange={handleChange} handleSubmit={handleSubmit} kelasValue={editValue} cta='Update' />
        </div>
    )
}

export default EditKelas