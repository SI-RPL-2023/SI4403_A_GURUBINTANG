import React from "react"
import eye from '../asset/icon/eye.svg';
import eyeSlash from '../asset/icon/eye-slash.svg';

const FormAccount = ({editValue, handleChange, handleSubmit, handleHidePass, isHidePass}) => {
    const {username, email, password} = editValue

    return (
        <div className="form-box">
                <form action="" className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="">Username</label>
                        <input type="text" name="username" id="username" value={username} onChange={handleChange} placeholder="Ubah username kamu disini..." required autoComplete='off' autoFocus='on' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={handleChange} placeholder="Ubah email kamu disini..." required autoComplete='off' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Password</label>
                        <input type={`${isHidePass ? 'password' : 'text'}`} name="password" id="password" value={password} onChange={handleChange} placeholder="Ubah password kamu disini..." required autoComplete='off' />
                        <div className="eye-box" onClick={handleHidePass}>
                            <img src={isHidePass ? eyeSlash : eye} alt="" />
                        </div>
                    </div>
                    <button type="submit" className="form-cta">Update</button>
                </form>
            </div>
    )
}

export default FormAccount