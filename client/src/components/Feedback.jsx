import React, { useEffect } from "react";
import { Range } from 'react-range';
import { useState } from "react";
import BigSteps from "./SliderRange";
import star from '../asset/icon/star.svg';
import { addFeedback } from "../controller/addFeedback";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Feedback = ({id_user, id_kelas}) => {
    const navigate = useNavigate()
    const [values, setValues] = useState([1])
    const [totalStar, setTotalStar] = useState([star])
    const [ulasan, setUlasan] = useState('')

    const handleStarChange = val => {
        setValues(val)
    }

    const handleUlasan = e => {
        setUlasan(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            feedbackRating: values[0],
            feedbackComment: ulasan
        }
        const msg = await addFeedback(id_kelas, data)
        toast.success(msg)
        setUlasan('')
        setValues([1])
        navigate(`/materi/${id_user}/${id_kelas}`)

    }

    const countStar = count => {
        const temp = []
        for (let i = 1; i <= count; i++) {
            temp.push(star)
        }
        setTotalStar(temp)
    }

    useEffect(() => {
        countStar(values.at(0))
    }, [values])
    
    return (
        <form className="slide__rating" onSubmit={handleSubmit}>
            <h1 className="slide__title">Feedback Kelas dan Review</h1>
            <div className="slide__rating-box">
                <h2>Beri rating kelas: </h2>
                <BigSteps handleStarChange={handleStarChange} values={values} />
                <div className="slide__stars">
                    <div className="slide__stars-box">
                        {totalStar.map((item, i) => {
                            return <img src={item} alt="" key={i} className='slide__star' />
                        })}
                    </div>
                    <div className="slide__indicator">
                        <img src={star} alt="" style={{opacity: `${0.5 + values.at(0)/10}`}} />
                        <span>{values.at(0)}/5</span>
                    </div>
                </div>
            </div>
            <div className="slide__rating-box">
                <h2>Beri ulasan kelas: </h2>
                <textarea name="" id="" rows="5" required onChange={handleUlasan} placeholder="Tulis ulasan..." value={ulasan}></textarea>
            </div>
            <button type="submit" className="slide__cta">Submit Feedback</button>
        </form> 
    )
}

export default Feedback