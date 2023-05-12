import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./UI/Form";
import eye from '../asset/icon/eye.svg';
import eyeSlash from '../asset/icon/eye-slash.svg';
import { toast } from "react-toastify";
import { loginMentor } from "../controller/loginMentor";
import LoaderCTA from "./LoaderCTA";

const LoginMentor = ({cookies, setCookie}) => {
    let navigate = useNavigate()
    const [isLoad, setLoad] = useState(false)
    const [loginValue, setLoginValue] = useState({email: '', password: ''})
    const [isHidePass, setHidePass] = useState(true)
    const {email, password} = loginValue

    const handleChange = e => {
        setLoginValue(preValue => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleHidePass = () => {
        setHidePass(!isHidePass)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoad(true)

        try {
            const {id, username, message} = await loginMentor(loginValue) 
            
            setTimeout(() => {
                setCookie('id', id, { path: '/' })
                setCookie('username', username, { path: '/' })
                setCookie('role', 'mentor', { path: '/' })
                toast.success(message)
                navigate('/')
                setLoad(false)
            }, 1500)
        } catch (error) {
            toast.warning(error.message)
            setLoad(false)
        }  
    }

    return (
        <Form>
            <div className="form-header">
                <h1 className="form-title">Masuk untuk Melanjutkan Optimasi Kelasmu!</h1>
                <p className="form-redirect">Belum punya akun? <a href="/register/mentor">Sign Up</a></p>
            </div>
            <div className="form-box">
                <form action="" className="login__form form"  onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" id="username" value={email} onChange={handleChange} placeholder="Tulis email kamu disini ..." required autoComplete='off' autoFocus='on' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Password</label>
                        <input type={`${isHidePass ? 'password' : 'text'}`} name="password" id="password" value={password} onChange={handleChange} placeholder="Tulis password kamu disini ..." required autoComplete='off' />
                        <div className="eye-box eye-box-login" onClick={handleHidePass}>
                            {isHidePass ? <img src={eyeSlash} alt="" /> : <img src={eye} alt="" />}
                        </div>
                        <a href="#" className="forgot-password">Lupa password?</a>
                    </div>
                    <button type="submit" className="form-cta">
                        {isLoad ? <LoaderCTA /> : 'Login'}
                    </button>
                    <div className="form-alternatif">
                        <div></div>
                        <p>atau</p>
                        <div></div>
                    </div>
                    <a href="/login" className="form-google-cta">
                        <span>Login as Mentee</span>
                    </a>
                </form>
            </div>
        </Form>
    )
}

export default LoginMentor