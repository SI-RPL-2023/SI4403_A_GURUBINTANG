import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addCourse } from "../controller/addCourse"
import FormKelas from "./FormKelas"
import { toast } from "react-toastify";

const AddKelas = () => {
    const navigate = useNavigate()
    const {id_mentor: idMentor} = useParams()
    const [addValue, setAddValue] = useState({idMentor, namaKelas: '', tentangKelas: '', introductionKelas: '', kategoriKelas: '', materiKelas: '', hargaCoretKelas: 0, hargaAsliKelas: 0})

    const handleChange = e => {
        setAddValue(preVal => {
            return {
                ...preVal,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const msg = await addCourse(idMentor, addValue)
        toast.success(msg)
        navigate(`/mentor/kelas/${idMentor}`)
    }

    return (
        <div className="add-kelas">
            <div className="form-header">
                <h1 className="form-title">Tambah Kelas Baru</h1>
                <p className="form-redirect">Buat dan upload kelas baru untuk pembelajaran yang bermutu</p>
            </div>
            <FormKelas handleChange={handleChange} handleSubmit={handleSubmit} kelasValue={addValue} cta='Submit' />
        </div>
    )
}

export default AddKelas