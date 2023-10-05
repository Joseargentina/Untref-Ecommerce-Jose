fetch('data/productos.js')
    .then(respuesta => respuesta.json())
    .then(function (datos) {
        console.log(datos);
})
.catch(error => {
    // Manejar cualquier error
    console.error('Error al cargar el archivo productos.js:', error);
});

const carrito = [];
