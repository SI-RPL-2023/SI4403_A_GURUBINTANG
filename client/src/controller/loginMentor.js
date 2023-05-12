const loginMentor = (data) => {
    return fetch(`http://localhost:3000/login/mentor`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json()
        })
        .then(res => {
            if(!res.success) {
                throw new Error(res.message)
            } else {
                return res
            }
        })
}

export {loginMentor}