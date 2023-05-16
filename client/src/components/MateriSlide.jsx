import React from "react";
import direct_link from '../asset/icon/direct_link.svg';
import Feedback from "./Feedback";

const YTContent = url => {
    return (
        <iframe src={url.replace('watch?v=', 'embed/')} frameborder="0" className="slide__iframe"></iframe>
    )
}

const FeedbackContent = (url) => {
    return <Feedback />
}

const IntroContent = (namaKelas, filteredContent) => {
    return (
        <div className="slide__teks">
            <h1 className="slide__title">{namaKelas}</h1>
            <p className="slide__isi">{filteredContent}</p>
        </div> 
    )
}

const MateriSlide = ({id_kelas, filteredContent, namaKelas}) => {

    const checkContent = content => {
        if(content.includes('youtube')) {
            return YTContent(filteredContent)
        } else if(content.includes('feedback')) {
            return FeedbackContent(`/feedback/${id_kelas}`)
        } else {
            return IntroContent(namaKelas, filteredContent)
        }
    }

    return (
        <div className="slide">
            {checkContent(filteredContent)}
        </div>
    )
}

export default MateriSlide