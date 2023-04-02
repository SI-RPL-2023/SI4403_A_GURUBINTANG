const login = (data) => {
    return fetch(`http://localhost:3000/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.msg
        })
}

export {login}