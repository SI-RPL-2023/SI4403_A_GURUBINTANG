const addFeedback = (id_course, data) => {
    return fetch(`http://localhost:3000/mycourse/feedback/${id_course}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',  'Accept': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.message
        })
}

export {addFeedback}