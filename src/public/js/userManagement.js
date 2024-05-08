const buttonChangeRole = document.getElementById('change-role');

buttonChangeRole.addEventListener("click", e => {
    e.preventDefault();
    
    // Obtener el valor del atributo data-userid
    const userId = buttonChangeRole.dataset.userid;
    console.log("USERID: " + userId);
    

    // Realizar la solicitud GET con el ID como parámetro de la URL
    fetch(`/api/users/premium/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => {
        if (result.ok) {
            window.location.replace(`/users/${userId}`);
        } else {
            alert("No se puede cambiar el rol de un administrador")
            console.log(result);
        }
    }).catch(error => {
        console.error('Error:', error);
    });
});

const deleteUserButton = document.getElementById('delete-user');

deleteUserButton.addEventListener("click", e => {
    e.preventDefault();
    
    // Obtener el valor del atributo data-userid
    const userId = deleteUserButton.dataset.userid;
    console.log("USERID: " + userId);
    

    // Realizar la solicitud GET con el ID como parámetro de la URL
    fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => {
        if (result.ok) {
            alert("Usuario eliminado")
            window.location.replace(`/userfind`);
        } else {
            alert("No se pudo eliminar")
            console.log(result);
        }
    }).catch(error => {
        console.error('Error:', error);
    });
});

