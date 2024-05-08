// AGREGAR AL CARRITO
// Seleccionar todos los botones con la clase "add-to-cart"
let addToCartButtons = document.querySelectorAll('.add-to-cart');


// Agregar un controlador de eventos de clic a cada botón
addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        let cid = document.getElementById('cart').textContent;

        let pid = event.target.getAttribute('data-product-id');

        console.log('Carrito:', cid);
        console.log('ID del producto:', pid);

        fetch(`/api/carts/${cid}/product/${pid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(result => {
            if (result.ok) {
                //;
            } else {
                console.log(result);
            }
        }).catch(error => {
            console.error('Error:', error);
        });

    });
});


let deleteToCartButtons = document.querySelectorAll('.remove-from-cart');


// Agregar un controlador de eventos de clic a cada botón
deleteToCartButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        let cid = document.getElementById('cart').textContent;

        let pid = event.target.getAttribute('data-product-id');

        console.log('Carrito:', cid);
        console.log('ID del producto:', pid);

        fetch(`/api/carts/${cid}/product/${pid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(result => {
            if (result.ok) {
                window.location.replace(`/cart/${cid}`);
            } else {
                console.log(result);
            }
        }).catch(error => {
            console.error('Error:', error);
        });

    });
});

