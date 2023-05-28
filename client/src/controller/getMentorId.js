const getMentorId = () => {
    return fetch(`http://localhost:3000/mentor/${id}`)
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.data
        })
}

export {getMentorId}