import { recorrerProductos, traerDatos  } from './funciones.js';


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
