let purchaseButton = document.getElementById('purchase');


purchaseButton.addEventListener('click', function (event) {
    event.preventDefault();
    let cid = event.target.getAttribute('data-cart-id');
    let email = event.target.getAttribute('data-email');

    console.log('Carrito:', cid);
    console.log('Email', email);
    const obj = {
        email
    }

    fetch(`/api/carts/${cid}/purchase`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => {
        if (result.ok) {
            window.location.replace(`/closedSale`);
        } else {
            console.log(result);
        }
    }).catch(error => {
        console.error('Error:', error);
    });

});

