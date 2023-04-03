import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dashboard from '../asset/icon/dashboard.svg';
import note from '../asset/icon/note.svg';
import receipt from '../asset/icon/receipt.svg';
import setting from '../asset/icon/setting.svg';
import logout from '../asset/icon/logout.svg';

const UserOption = ({isClicked, removeCookie}) => {
     let navigate = useNavigate();

     const handleLogout = () => {
          removeCookie('id', {path:'/'})
          removeCookie('username', {path:'/'})
          toast.success('Logout successful')
          navigate('/')
     }

    return (
       <ul className={`option ${isClicked && 'option-clicked'}`}>
           <li className="option__list">
                <a href="/dashboard" className="option__link"><img className="option__icon" src={dashboard} alt="" /> Dashboard</a>
           </li>
           <li className="option__list">
                <a href="/dashboard/kelas-saya" className="option__link"><img className="option__icon" src={note} alt="" /> Kelas Saya</a>
           </li>
           <li className="option__list">
                <a href="/dashboard/transaksi" className="option__link"><img className="option__icon" src={receipt} alt="" /> Daftar Transaksi</a>
           </li>
           <li className="option__list">
                <a href="/setting" className="option__link"><img className="option__icon" src={setting} alt="" /> Pengaturan Akun</a>
           </li>
           <li className="option__list" onClick={handleLogout}>
                <a className="option__link"><img className="option__icon" src={logout} alt="" /> Logout</a>
           </li>
       </ul>
    )
}

export default UserOption