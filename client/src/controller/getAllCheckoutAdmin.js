const getAllCheckoutAdmin = (id_mentor) => {
    return fetch(`http://localhost:3000/checkout/admin/${id_mentor}`)
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.data
        })
}

export {getAllCheckoutAdmin}