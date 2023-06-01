const getUserProfile = (id_user) => {
    return fetch(`http://localhost:3000/profile/user/${id_user}`)
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.profile
        })
}

export {getUserProfile}