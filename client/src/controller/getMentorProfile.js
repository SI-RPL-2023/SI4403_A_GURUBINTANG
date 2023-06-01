const getMentorProfile = (id_mentor) => {
    return fetch(`http://localhost:3000/profile/mentor/${id_mentor}`)
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.profile
        })
}

export {getMentorProfile}