import React, { useState } from "react"
import { useParams } from "react-router-dom"
import FormKelas from "./FormKelas"

const AddKelas = () => {
    const {id_mentor} = useParams()
    const [addValue, setAddValue] = useState({namaKelas: '', tentangKelas: '', introductionKelas: '', kategoriKelas: '', materiKelas: '', hargaCoretKelas: 0, hargaAsliKelas: 0})
    // const {namaKelas, tentangKelas, kategoriKelas, materiKelas, hargaCoretKelas, hargaAsliKelas} = addValue

    const handleChange = e => {
        setAddValue(preVal => {
            return {
                ...preVal,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
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