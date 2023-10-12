import { obtenerDetallesProducto, agregarAlCarrito } from './funciones.js';

// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

obtenerDetallesProducto(productId)
    .then(function (producto) {
        // Imprimir los detalles del producto en detail.html
        imprimirDetalles(producto);
    })
    .catch(function (error) {
        console.error(error);
    });

// Variable para obtener el valor del contador de productos en el localStorage
let contador = parseInt(localStorage.getItem('contadorProductos')) || 0;

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

    // Crear el contenedor para las estrellas
    let estrellasContainer = document.createElement('fieldset');
    estrellasContainer.className = 'estrellas';

    // Obtener el precio del producto
    let precio = producto.precio;

    // Determinar la cantidad de estrellas según el precio
    let cantidadEstrellas;
    if (precio < 85000) {
    cantidadEstrellas = 3;
    } else {
    cantidadEstrellas = 5;
    }
    // Crear las estrellas utilizando etiquetas <i>
    for (let i = 1; i <= 5; i++) {
        let estrella = document.createElement('i');
        estrella.className = 'fa-sharp fa-solid fa-star';

    // Pintar las estrellas hasta la cantidad aleatoria generada
    if (i <= cantidadEstrellas) {
        estrella.classList.add('estrella-llena');
    }

    estrellasContainer.appendChild(estrella);
    }

    // Agregar el contenedor de estrellas después de la descripción avanzada
    figcaption.appendChild(estrellasContainer);

    let precioProducto = document.createElement('span');
    precioProducto.textContent = 'Precio $' + producto.precio;
    figcaption.appendChild(precioProducto);

    let btnAgregarAlCarrito = document.createElement('button');
    btnAgregarAlCarrito.className = 'btn-agregar-carrito btn';
    btnAgregarAlCarrito.textContent = 'Agregar Al Carrito';
    figcaption.appendChild(btnAgregarAlCarrito);


    // Función agregarAlCarrito en este archivo
    btnAgregarAlCarrito.addEventListener('click', function (e){
        agregarAlCarrito(producto);
    });

    let btnVolver = document.createElement('a');
    btnVolver.className = 'btn-volver';
    btnVolver.textContent = 'Volver a Inicio';
    btnVolver.href = 'index.html';
    figcaption.appendChild(btnVolver);

    contenedorDetalles.appendChild(contenedorProducto);
    contenedorProducto.appendChild(figure);
    contenedorProducto.appendChild(figcaption);
}

//redirigir a cart.html cuando se de click en el carrito
const contadorCarrito = document.getElementById('carrito');
contadorCarrito.addEventListener('click', function() {
    window.location.href = 'cart.html';
});

//Obtener la cantidad de productos guardados en el localStorage
window.addEventListener('DOMContentLoaded', function () {
    let contador = parseInt(localStorage.getItem('contadorProductos')) || 0;
    document.getElementById('contadorProductos').textContent = contador;
});