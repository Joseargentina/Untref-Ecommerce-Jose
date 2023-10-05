fetch('./data/productos.js')
    .then(respuesta => respuesta.json())
    .then(function (datos) {
        console.log(datos);
        recorrerProductos(datos); // Llamar a la función recorrerProductos después de imprimir los datos
})
.catch(error => {
    // Manejar cualquier error
    console.error('Error al cargar el archivo productos.js:', error);
});

const carrito = [];

//funcion para recorrer cada producto del array productos y se muestran en la pantalla

function recorrerProductos (productos) {
    let contenedorProductos = document.getElementById('contenedor-productos');

    productos.forEach(function (producto) {
        let contenedorProducto = document.createElement('article');
        contenedorProducto.className = 'producto';

        let figure = document.createElement('figure');
        let imagenProducto = document.createElement('img');
        imagenProducto.src = producto.img;
        figure.appendChild(imagenProducto);

        let figcaption = document.createElement('figcaption');
        let tituloProducto = document.createElement('h3');
        tituloProducto.textContent = producto.titulo;
        figcaption.appendChild(tituloProducto);

        let descripcionProducto = document.createElement('ul');
        producto.descripcion.forEach(function (descripcion) {
        let li = document.createElement('li');
        li.textContent = descripcion;
        descripcionProducto.appendChild(li);
        });
        figcaption.appendChild(descripcionProducto);

        let precioProducto = document.createElement('span');
        precioProducto.textContent = '$' + producto.precio;
        figcaption.appendChild(precioProducto);

        let btnVerDetalle = document.createElement('button');
        btnVerDetalle.className = 'btn-detalle btn';
        btnVerDetalle.textContent = 'Ver Detalle';
        btnVerDetalle.addEventListener('click', function () {
            // Redirigir a detail.html
            window.location.href = 'detail.html?id=' + producto.id; // Paso el ID del producto en la URL para obtener los detalles en detail.html
        });
        figcaption.appendChild(btnVerDetalle);

        let btnAgregarAlCarrito = document.createElement('button');
        btnAgregarAlCarrito.className = 'btn-agregar-carrito btn';
        btnAgregarAlCarrito.textContent = 'Agregar Al Carrito';
        figcaption.appendChild(btnAgregarAlCarrito);

        contenedorProducto.appendChild(figure);
        contenedorProducto.appendChild(figcaption);
        contenedorProductos.appendChild(contenedorProducto);
    })
    
}
