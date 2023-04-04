const getCourse = () => {
    return fetch(`http://localhost:3000/course`)
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.data
        })
}

export {getCourse}