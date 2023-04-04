const registerMentor = (data) => {
    return fetch(`http://localhost:3000/signup/mentor`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.message
        })
}

export {registerMentor}