
const socketIndex = io()

const addProductsForm = document.getElementById('add-product-form')
addProductsForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener referencias a los elementos del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const status = true
    const stock = document.getElementById('stock').value;
    const category = "A"
    const thumbnail = []

    // Crear un objeto con la información capturada
    var producto = {
        title: title,
        description: description,
        code: code,
        price: price,
        stock: stock,
        status: status,
        category: category,
        thumbnail: thumbnail
    };

    // Mostrar el objeto en la consola (puedes hacer lo que quieras con el objeto)
    console.log(producto);

    socketIndex.emit('addProduct', producto);

});

const updateUl = document.getElementById("update-container");
socketIndex.on("products-update", (data)=>{

    updateUl.innerHTML = "";
    for (const el of data) {
        console.log(data)
        const li = document.createElement("li");
        li.innerText = `${el.title} || ${el.description} || $${el.price}`;
        updateUl.appendChild(li)
    }
})