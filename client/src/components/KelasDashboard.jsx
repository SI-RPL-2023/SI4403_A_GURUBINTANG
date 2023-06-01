import React, { useState } from "react";
import iconKelas from '../asset/icon/icon-kelas.svg';

const KelasDashboard = ({id_mentor, courses}) => {
    return (
        <div className="listKelas">
            <div className="listKelas__detail">
                <div><img src={iconKelas} alt="" /> Kelas yang kamu publish ({courses.length})</div>
                <a href={`/mentor/kelas/${id_mentor}`}>Lihat Semua Kelas</a>
            </div>
        </div>
    )
}

export default KelasDashboard