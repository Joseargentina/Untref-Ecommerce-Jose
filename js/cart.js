fetch('data/productos.json')
    .then(respuesta => respuesta.json())
    .then(function (datos) {
        console.log(datos);
})