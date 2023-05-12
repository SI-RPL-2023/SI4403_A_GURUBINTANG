const getMentor = () => {
    return fetch(`http://localhost:3000/mentor`)
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.data
        })
}

export {getMentor}