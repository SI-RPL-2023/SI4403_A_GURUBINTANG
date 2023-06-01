import React, { useEffect } from "react";
import Card from "./Card";
import Footer from "./Footer";
import { listKelas } from "../data";
import { useState } from "react";
import { getCourse } from "../controller/getCourse";

const Kelas = () => {
    // const [isLoad, setLoad] = useState(true)
    const [course, setCourse] = useState([])
    const [filteredCourse, setfilteredCourse] = useState([])
    const [search, setSearch] = useState('')
    

    const handleChange = e => {
        setSearch(e.target.value.toLowerCase())
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(!search) {
            setfilteredCourse(course)
        } else {
            const data = course.filter(item => item.namaKelas.toLowerCase().includes(search))
            setfilteredCourse(data)
        }
    }

    const getAllCourse = async () => {
        const data = await getCourse()
        setCourse(data)
        setfilteredCourse(data)
    }

    useEffect(() => {
        getAllCourse()
    }, [])

    return (
        <div className="kelas">
            <div className="kelas__content">
                <div className="kelas__heading">
                    <span className="kelas__softTitle">PRODUK KELAS</span>
                    <h1 className="kelas__title">Belajar untuk Menjadi Pengajar Terbaik</h1>
                    <h2 className="kelas__subtitle">Kelas Guru Bintang solusi terbaik untuk pengajar yang ingin meningkatkan keterampilannya dengan menyenangkan, pelajari kelas kelas yang tersedia dan jadilah ahlinya!</h2>
                </div>
                <div className="kelas__search">
                    <form onSubmit={handleSubmit} className='kelas__form'>
                        <input type="text" className="kelas__input" onChange={handleChange} name="search" value={search} placeholder='Cari nama kelas...' autoComplete='off' />
                        <button type="submit" className="kelas__search-cta">Search</button>
                    </form>
                </div>
                <Card listKelas={filteredCourse} /> 
            </div>
            <Footer />
        </div>
    )
}

export default Kelas