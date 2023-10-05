fetch('./data/productos.js')
    .then(respuesta => respuesta.json())
    .then(function (datos) {
        console.log(datos);
})