const deleteCourse = (id_course)=> {
    return fetch(`http://localhost:3000/deleteCourse/${id_course}`, {
            method: 'DELETE'
        })
        .then(response => {
            return response.json()
        })
        .then(res => window.location.reload())
}

export {deleteCourse}