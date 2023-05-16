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
import InstruksiBayar from "./components/InstruksiBayar";
import Register from "./components/Register";
import Login from "./components/Login";
import RegisterMentor from "./components/RegisterMentor";
import LoginMentor from "./components/LoginMentor";
// import Dashboard from "./components/Dashboard";
// import SemuaKelasUser from "./components/SemuaKelasUser";
// import SemuaSertifUser from "./components/SemuaSertifUser";
// import DaftarTransaksi from "./components/DaftarTransaksi";
import SuccessPayment from "./components/SuccessPayment";
import WaitingPayment from "./components/WaitingPayment";
// import Materi from "./components/Materi";
import Loader from "./components/Loader";
import Mentor from "./components/Mentor";
import EditKelas from "./components/EditKelas";

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
            <Route index element={<Kelas />} />
            <Route path=':id' element={<DetailKelas />} />
          </Route>
          <Route path='mentor' >
            <Route index element={<Mentor />} />
            {/* <Route path=':id' element={<DetailKelas />} /> */}
          </Route>
          <Route path='mentor' >
            <Route path='kelas/edit/:id_kelas' element={<EditKelas />} />
          </Route>
          <Route path='checkout/:id_kelas' element={cookies.id ? <Checkout cookies={cookies} /> : <Navigate to='/login' />} />
          <Route path='payment' >
            <Route path='success/:id_user/:id_kelas' element={cookies.id ? <SuccessPayment cookies={cookies} /> : <Login />} />
            <Route path='waiting/:id_user/:id_kelas' element={cookies.id ? <WaitingPayment /> : <Login />} />
          </Route>
          <Route path='instruksi-pembayaran/:id_user/:id_kelas' element={<InstruksiBayar />} />
          {/* <Route path='dashboard' element={accessToken ? <Dashboard /> : <Login />} /> */}
          {/* <Route path='dashboard' >
            <Route path='kelas-saya' element={accessToken ? <SemuaKelasUser /> : <Login />} />
            <Route path='sertifikat' element={accessToken ? <SemuaSertifUser /> : <Login />} />
            <Route path='transaksi' element={accessToken ? <DaftarTransaksi /> : <Login />} />
          </Route>
          <Route path='payment/success' element={<SuccessPayment />} />
          <Route path='materi' element={<Materi />} />
          <Route path='tentang' element={<Tentang />} />
          <Route path='checkout/:judul' element={accessToken ? <Checkout /> : <Login />} />
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
