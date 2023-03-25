import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import Navigation from "./components/Navigation";
// import Kelas from "./components/Kelas";
// import Tentang from "./components/Tentang";
// import DetailKelas from "./components/DetailKelas";
// import Checkout from "./components/Checkout";
// import InstruksiBayar from "./components/InstruksiBayar";
import Register from "./components/Register";
import Login from "./components/Login";
import RegisterMentor from "./components/RegisterMentor";
import LoginMentor from "./components/LoginMentor";
// import Dashboard from "./components/Dashboard";
// import SemuaKelasUser from "./components/SemuaKelasUser";
// import SemuaSertifUser from "./components/SemuaSertifUser";
// import DaftarTransaksi from "./components/DaftarTransaksi";
// import SuccessPayment from "./components/SuccessPayment";
// import Materi from "./components/Materi";
import Loader from "./components/Loader";

const App = () => {
  const [isLoad, setLoad] = useState(true)

  document.addEventListener('readystatechange', () => {
    if(document.readyState !== 'complete') {
      setLoad(!isLoad)
      document.body.classList.toggle('fixBody')
    } else {
        setTimeout(() => {
          setLoad(!isLoad)
          document.body.classList.toggle('fixBody')
        }, 800)
    }
  })

  return (
    <Router>
      {isLoad ? <Loader /> : <div className="App">
        <Navigation />
        <Routes>
          <Route index element={<Home />} exact />
          <Route path='register' element={<Register />} />
          <Route path='register-mentor' element={<RegisterMentor />} />
          <Route path='login' element={<Login />} />
          <Route path='login-mentor' element={<LoginMentor />} />
          {/* <Route path='dashboard' element={accessToken ? <Dashboard /> : <Login />} /> */}
          {/* <Route path='dashboard' >
            <Route path='kelas-saya' element={accessToken ? <SemuaKelasUser /> : <Login />} />
            <Route path='sertifikat' element={accessToken ? <SemuaSertifUser /> : <Login />} />
            <Route path='transaksi' element={accessToken ? <DaftarTransaksi /> : <Login />} />
          </Route>
          <Route path='payment/success' element={<SuccessPayment />} />
          <Route path='kelas' element={<Kelas />} />
          <Route path='materi' element={<Materi />} />
          <Route path='tentang' element={<Tentang />} />
          <Route path='detail-kelas/:judul' element={<DetailKelas />} />
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
