const uploadBuktiBayar = (id_checkout, data) => {
    return fetch(`http://localhost:3000/checkout/buktibayar/${id_checkout}`, {
            method: 'PUT',
            body: data
        })
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.message
        })
}

export {uploadBuktiBayar}