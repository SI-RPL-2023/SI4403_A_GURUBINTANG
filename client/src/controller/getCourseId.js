const getCourseId = (id) => {
    return fetch(`http://localhost:3000/course/${id}`)
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.data
        })
}

export {getCourseId}