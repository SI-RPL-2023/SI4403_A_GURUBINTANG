import React from "react"

const FormKelas = ({handleChange, handleSubmit, kelasValue, cta}) => {
    const {namaKelas, tentangKelas, introductionKelas, kategoriKelas, materiKelas, totalMateriKelas, hargaCoretKelas, hargaAsliKelas} = kelasValue

    return (
        <div className="form-box">
                <form action="" className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="">Nama Kelas</label>
                        <input type="text" name="namaKelas" id="namaKelas" value={namaKelas} onChange={handleChange} placeholder="Tulis nama kelas ..." autoComplete='off' autoFocus='on' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Introduction Kelas</label>
                        <textarea name="introductionKelas" id="introductionKelas" rows="8" autoComplete='off' onChange={handleChange} ></textarea>
                        {/* <input type="text" name="introductionKelas" id="introductionKelas" value={introductionKelas} onChange={handleChange} placeholder="Tulis introduction kelas ..." autoComplete='off' /> */}
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Tentang Kelas</label>
                        <textarea name="tentangKelas" id="tentangKelas" rows="8" autoComplete='off' value={tentangKelas} onChange={handleChange} ></textarea>
                        {/* <input type="text" name="tentangKelas" id="tentangKelas" value={tentangKelas} onChange={handleChange} placeholder="Tulis deskripsi kelas ..." autoComplete='off' /> */}
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Kategori Kelas</label>
                        <input type="text" name="kategoriKelas" id="kategoriKelas" value={kategoriKelas} onChange={handleChange} placeholder="Tulis kategori kelas (filosofis, praktis, dsb) ..." autoComplete='off' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Link Video Materi Kelas</label>
                        <input type="text" name="materiKelas" id="materiKelas" value={materiKelas} onChange={handleChange} placeholder="Tulis url video materi ..." autoComplete='off' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Harga Asli</label>
                        <input type="number" min={0} name="hargaAsliKelas" id="hargaAsliKelas" value={hargaAsliKelas} onChange={handleChange} placeholder="Tulis harga asli kelas ..." autoComplete='off' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Harga Coret</label>
                        <input type="number" min={0} name="hargaCoretKelas" id="hargaCoretKelas" value={hargaCoretKelas} onChange={handleChange} placeholder="Tulis harga coret kelas ..." autoComplete='off' />
                    </div>
                    <button type="submit" className="form-cta">{cta}</button>
                </form>
            </div>
    )
}

export default FormKelas