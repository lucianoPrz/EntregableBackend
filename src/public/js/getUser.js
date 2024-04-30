const form = document.getElementById('userForm');

form.addEventListener("submit", e => {
    e.preventDefault();
    console.log("SUBMIT LOGIN");
    const data = new FormData(form);
    let id;

    // Recuperar el valor del campo ID del formulario
    data.forEach((value, key) => {
        if (key === 'id') {
            id = value;
        }
    });

    // Realizar la solicitud GET con el ID como parámetro de la URL
    fetch(`/api/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => {
        if (result.ok) {
            window.location.replace(`/users/${id}`);
        } else {
            console.log(result);
        }
    }).catch(error => {
        console.error('Error:', error);
    });
});
