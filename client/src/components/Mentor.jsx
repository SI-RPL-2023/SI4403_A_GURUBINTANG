import React, { useEffect } from "react";
import Card from "./Card";
import Footer from "./Footer";
import { useState } from "react";
import { getCourse } from "../controller/getCourse";
import { getMentor } from "../controller/getMentor";
import CardMentor from "./CardMentor";

const Mentor = () => {
    const [isLoad, setLoad] = useState(true)
    const [mentors, setMentors] = useState([])

    const getAllMentor = async () => {
        const data = await getMentor()
        setMentors(data)
    }

    useEffect(() => {
        getAllMentor()
    }, [])

    return (
        <div className="mentor">
            <div className="mentor__content">
                <div className="mentor__heading">
                    <span className="mentor__softTitle">OUR MENTORS</span>
                    <h1 className="mentor__title">Mulai Buat Kelas Untuk Memberdayakan Sesama Pengajar</h1>
                    <h2 className="mentor__subtitle">Mentor Guru Bintang memberikan solusi terbaik untuk pengajar yang ingin meningkatkan keterampilannya dengan menyenangkan, pelajari kelas kami yang tersedia dan jadilah ahlinya!</h2>
                </div>
                <CardMentor listMentor={mentors} /> 
            </div>
            <Footer />
        </div>
    )
}

export default Mentor