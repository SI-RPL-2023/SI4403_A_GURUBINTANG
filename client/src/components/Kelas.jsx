import React, { useEffect } from "react";
import Card from "./Card";
import Footer from "./Footer";
import { listKelas } from "../data";
import { useState } from "react";
import { getCourse } from "../controller/getCourse";

const Kelas = () => {
    const [isLoad, setLoad] = useState(true)
    const [course, setCourse] = useState([])
    // const listKelasBaru = [...listKelas]

    const getAllCourse = async () => {
        const data = await getCourse()
        setCourse(data)
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
                <Card listKelas={course} /> 
            </div>
            <Footer />
        </div>
    )
}

export default Kelas