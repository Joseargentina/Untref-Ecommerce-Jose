import { recorrerProductos, traerDatos, agregarAlCarrito  } from './funciones.js';

//uso la funcion traer datos para obtener los datos de los productos
traerDatos()
    .then(function (datos) {
        recorrerProductos(datos);
    })

    .catch(function (error) {
        console.error(error);
    });


const carrito = [];

//redirigir a cart.html cuando se de click en el carrito
const iconoCarrito = document.getElementById('carrito');
iconoCarrito.addEventListener('click', function() {
    window.location.href = 'cart.html';
});


