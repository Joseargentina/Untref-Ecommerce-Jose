fetch('data/productos.js')
    .then(respuesta => respuesta.json())
    .then(function (datos) {
        console.log(datos);
})
.catch(error => {
    // Manejar cualquier error
    console.error('Error al cargar el archivo productos.js:', error);
});

// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
// let tituloProducto = urlParams.get('titulo');
// document.querySelector('.titulo-productos').textContent = tituloProducto;

// Realizar una nueva solicitud para obtener los detalles del producto
fetch('data/productos.js')
    .then(respuesta => respuesta.json())
    .then(function (datos) {
        // Buscar el producto correspondiente al ID
        const producto = datos.find(producto => producto.id === productId);
        if (producto) {
            // Imprimir los detalles del producto en detail.html
            imprimirDetalles(producto);
        } else {
            console.error('No se encontró el producto con ID:', productId);
        }
    })
    .catch(error => {
        // Manejar cualquier error
        console.error('Error al cargar el archivo productos.js:', error);
    });

function imprimirDetalles(producto) {
    let productoDetalleTitulo = document.querySelector('.titulo-productos');
    productoDetalleTitulo.textContent = producto.titulo;
    let contenedorDetalles = document.getElementById('contenedor-detalles');
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

    let descripcionAvanzada = document.createElement('p');
    descripcionAvanzada.textContent = producto.descripcionAvanzada;
    figcaption.appendChild(descripcionAvanzada);

    let precioProducto = document.createElement('span');
    precioProducto.textContent = '$' + producto.precio;
    figcaption.appendChild(precioProducto);

    let btnAgregarAlCarrito = document.createElement('button');
    btnAgregarAlCarrito.className = 'btn-agregar-carrito btn';
    btnAgregarAlCarrito.textContent = 'Agregar Al Carrito';
    figcaption.appendChild(btnAgregarAlCarrito);

    let btnVolver = document.createElement('a');
    btnVolver.textContent = 'Volver a Inicio';
    btnVolver.href = 'index.html';
    figcaption.appendChild(btnVolver);

    contenedorDetalles.appendChild(contenedorProducto);
    contenedorProducto.appendChild(figure);
    contenedorProducto.appendChild(figcaption);
}