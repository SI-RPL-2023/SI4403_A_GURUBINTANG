const editUserProfile = (id_user, data) => {
    return fetch(`http://localhost:3000/edit/user/${id_user}`, {
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

export {editUserProfile}