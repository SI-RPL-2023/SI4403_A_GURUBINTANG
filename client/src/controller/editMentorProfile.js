const editMentorProfile = (id_mentor, data) => {
    return fetch(`http://localhost:3000/edit/mentor/${id_mentor}`, {
            method: 'PUT',
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

export {editMentorProfile}