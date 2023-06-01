import React, { useEffect, useState } from "react";
import KelasDashboard from "./KelasDashboard";
import Card from "./Card";
import note from '../asset/icon/kelas-selesai.svg';
import award from '../asset/icon/award.svg';
import { useParams } from "react-router-dom";
import { getCourse } from "../controller/getCourse";
import { getAllCheckoutAdmin } from "../controller/getAllCheckoutAdmin";

const Dashboard = ({cookies}) => {
    const {id_mentor} = useParams()
    const [courses, setCourses] = useState([])
    const [transaksi, setTransaksi] = useState([])

    const getAllCourse = async () => {
        const data = await getCourse()
        const mentorCourses = data.filter(item => item.idMentor === id_mentor)
        setCourses(mentorCourses)
    }

    const fetchCheckoutAdmin = async () => {
        const data = await getAllCheckoutAdmin(id_mentor)
        setTransaksi(data)
    }

    useEffect(() => {
        getAllCourse()
        fetchCheckoutAdmin()
    }, [])

    return (
        <div className="dashboard">
            <div className="dashboard__left">
                <div className="dashboard__banner">
                    <div className="dashboard__greeting">
                        <h1 className="dashboard__title">Halo, {cookies.username}</h1>
                        <p className="dashboard__desc">Buat kelas lebih banyak untuk terus bisa mengedukasi dan memberikan manfaat</p>
                    </div>
                    <div className="dashboard__overview">
                        <div className="dashboard__overview-detail">
                            <div><img src={note} alt="" /> {courses.length}</div>
                            <p>Kelas dipublish</p>
                        </div>
                        <div className="dashboard__overview-detail">
                            <div><img src={award} alt="" />{transaksi.length}</div>
                            <p>Kelas terjual</p>
                        </div>
                    </div>
                </div>
                <KelasDashboard id_mentor={id_mentor} courses={courses} />
            </div>
            <Card listKelas={courses.slice(0,2)} className='listKelas__card' />
        </div>
    )
}

export default Dashboard