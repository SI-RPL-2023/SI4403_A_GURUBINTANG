const approveCheckout = (id_mentor, id_checkout) => {
    return fetch(`http://localhost:3000/checkout/admin/${id_mentor}/${id_checkout}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',  'Accept': 'application/json'}
        })
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.message
        })
}

export {approveCheckout}