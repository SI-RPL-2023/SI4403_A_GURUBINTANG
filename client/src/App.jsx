import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Kelas from "./components/Kelas";
import DetailKelas from "./components/DetailKelas";
// import Tentang from "./components/Tentang";
import Checkout from "./components/Checkout";
// import InstruksiBayar from "./components/InstruksiBayar";
import Register from "./components/Register";
import Login from "./components/Login";
import RegisterMentor from "./components/RegisterMentor";
import LoginMentor from "./components/LoginMentor";
// import Dashboard from "./components/Dashboard";
import SemuaKelasUser from "./components/SemuaKelasUser";
// import SemuaSertifUser from "./components/SemuaSertifUser";
// import DaftarTransaksi from "./components/DaftarTransaksi";
// import SuccessPayment from "./components/SuccessPayment";
// import Materi from "./components/Materi";
import Loader from "./components/Loader";
import Mentor from "./components/Mentor";
import SuccessPayment from "./components/SuccessPayment";
import WaitingPayment from "./components/WaitingPayment";
import InstruksiBayar from "./components/InstruksiBayar";
import MentorOption from "./components/MentorOption";
import KelasMentor from "./components/KelasMentor";
import AddKelas from "./components/AddKelas";
import EditKelas from "./components/EditKelas";
import Materi from "./components/Materi";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['id', 'username', 'role']);
  const [isLoad, setLoad] = useState(true)

  useEffect(() => {
    document.body.classList.add('fixBody')

    setTimeout(() => {
      setLoad(false)
      document.body.classList.remove('fixBody')
    }, 700);
  }, [])

  return (
    <Router>
      {isLoad ? <Loader /> : <div className="App">
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        
        <Navigation cookies={cookies} removeCookie={removeCookie} />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path='register' >
            <Route index element={cookies.id ? <Navigate to='/' /> : <Register cookies={cookies} setCookie={setCookie} />} />
            <Route path="mentor" element={cookies.id ? <Navigate to='/' /> : <RegisterMentor cookies={cookies} setCookie={setCookie} />} />
          </Route>
          <Route path='login' >
            <Route index element={cookies.id ? <Navigate to='/' /> : <Login cookies={cookies} setCookie={setCookie} />} />
            <Route path="mentor" element={cookies.id ? <Navigate to='/' /> : <LoginMentor cookies={cookies} setCookie={setCookie} />} />
          </Route>
          <Route path='kelas' >
            <Route index element={cookies.role === 'mentor' ? <Navigate to='/' /> : <Kelas />} />
            <Route path=':id' element={<DetailKelas />} />
          </Route>
          <Route path='mentors' >
            <Route index element={<Mentor />} />
            {/* <Route path=':id' element={<DetailKelas />} /> */}
          </Route>
          <Route path='checkout/:id_kelas' element={cookies.id ? <Checkout cookies={cookies} /> : <Navigate to='/login' />} />
          <Route path='payment' >
            <Route path='success/:id_user/:id_kelas' element={cookies.id ? <SuccessPayment cookies={cookies} /> : <Login />} />
            <Route path='waiting/:id_user/:id_kelas' element={cookies.id ? <WaitingPayment /> : <Login />} />
          </Route>
          <Route path='instruksi-pembayaran/:id_user/:id_kelas' element={<InstruksiBayar />} />
          <Route path='mentor' >
            {/* <Route path='dashboard/:id' element={cookies.id ? <SuccessPayment /> : <Login />} /> */}
            <Route path='kelas/:mentor_id' element={<KelasMentor />} />
            {/* <Route path='transaksi/:id' element={cookies.id ? <WaitingPayment /> : <Login />} /> */}
            <Route path='kelas/add/:id_mentor' element={<AddKelas />} />
            <Route path='kelas/edit/:id_kelas' element={<EditKelas />} />
          </Route>
          <Route path='materi' >
            <Route path=':id_user/:id_kelas' element={cookies.role === 'user' ? <Materi /> : <Login />} />
          </Route>
          <Route path='user' >
            <Route path='kelas-saya/:id_user' element={<SemuaKelasUser cookies={cookies} />} />
            {/* <Route path='transaksi/:id_user' element={<Materi />} /> */}
            {/* <Route path='setting/:id_user' element={<Materi />} /> */}
          </Route>
          {/* <Route path='feedback' >
            <Route path=':id_kelas' element={<Materi />} />
          </Route> */}
          {/* <Route path='dashboard' element={accessToken ? <Dashboard /> : <Login />} /> */}
          {/* <Route path='dashboard' >
            <Route path='kelas-saya' element={accessToken ? <SemuaKelasUser /> : <Login />} />
            <Route path='sertifikat' element={accessToken ? <SemuaSertifUser /> : <Login />} />
            <Route path='transaksi' element={accessToken ? <DaftarTransaksi /> : <Login />} />
          </Route>
          <Route path='tentang' element={<Tentang />} />
        <Route path='instruksi-pembayaran' element={<InstruksiBayar />} /> */}

          {/* <Route path='/produk-kelas/:judul' element={<DetailProduk />} /> */}
          {/* <Route path='/program' element={<Program />} /> */}
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </div>}
    </Router>
  )
}

export default App;
