import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { editMentorProfile } from "../controller/editMentorProfile"
import { editUserProfile } from "../controller/editUserProfile"
import { getMentorProfile } from "../controller/getMentorProfile"
import { getUserProfile } from "../controller/getUserProfile"
import FormAccount from "./FormAccount"

const EditAccount = ({setCookie, cookies}) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [editValue, setEditValue] = useState({username: '', email: '', password: ''})
    const [isHidePass, setHidePass] = useState(true)
    const {username} = editValue

    const handleChange = e => {
        setEditValue(preVal => {
            return {
                ...preVal,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(cookies.role === 'user') {
            const msg = await editUserProfile(id, editValue)
            toast.success(msg)
            navigate(`/user/setting/${id}`)
        } else {
            const msg = await editMentorProfile(id, editValue)
            toast.success(msg)
            navigate(`/mentor/setting/${id}`)
        }
        setCookie('username', username, { path: '/' })
    }

    const handleHidePass = () => {
        setHidePass(!isHidePass)
    }

    const fetchDetailProfile = async () => {
        if(cookies.role === 'user') {
            const data = await getUserProfile(id)
            setEditValue(data)
        } else {
            const data = await getMentorProfile(id)
            setEditValue(data)
        }
    }

    useEffect(() => {
        fetchDetailProfile()
    }, [])

    return (
        <div className="edit-kelas">
            <div className="form-header">
                <h1 className="form-title">Edit Akun</h1>
                <p className="form-redirect">Atur informasi akun kamu sesuai kebutuhan</p>
            </div>
            <FormAccount handleChange={handleChange} handleSubmit={handleSubmit} editValue={editValue} handleHidePass={handleHidePass} isHidePass={isHidePass}  />
        </div>
    )
}

export default EditAccount