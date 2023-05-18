import React, { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getCourse } from "../controller/getCourse"
import FormKelas from "./FormKelas"

const EditKelas = () => {
    const {id_kelas} = useParams()
    const [editValue, setEditValue] = useState({namaKelas: '', tentangKelas: '', introductionKelas: '', kategoriKelas: '', materiKelas: '', hargaCoretKelas: 0, hargaAsliKelas: 0})
    // const {namaKelas, tentangKelas, kategoriKelas, materiKelas, hargaCoretKelas, hargaAsliKelas} = addValue

    const handleChange = e => {
        setEditValue(preVal => {
            return {
                ...preVal,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    const fetchDetailKelas = async () => {
        const data = await getCourse()
        const kelas = data.find(item => item._id === id_kelas)
        setEditValue(preVal => {
            return {
                ...preVal,
                ...kelas
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