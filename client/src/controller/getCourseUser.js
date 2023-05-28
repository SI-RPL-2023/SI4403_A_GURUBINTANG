const getCourseUser = (id_user) => {
    return fetch(`http://localhost:3000/course/${id_user}`)
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.data
        })
}

export {getCourseUser}