import { traerDatos, actualizarContenidoCarrito, actualizarContenidoPrecioFinal, agregarEventoEliminarProducto, finalizarCompra, sumarProductos, mostrarPrecioFinal, mostrarPrecioProducto } from './funciones.js';

traerDatos()
    .then(function (datos) {
    })

    .catch(function (error) {
        console.error(error);
    });

    //Obtengo la cantidad total de productos guardados en el localStorage
    let contador = parseInt(localStorage.getItem('contadorProductos')) || 0;
    document.getElementById('contadorProductos').textContent = contador;

    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    let contenidoHTML = ''; //variable para almacenar el contenido HTML del contenedor-carrito

    

    if (!Array.isArray(carrito) || carrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El carrito se encuentra vacio!'
        })
        contenidoHTML = actualizarContenidoCarrito();
    } else {
        carrito.forEach(function (producto) {
            // Llamar a la funcion actualizarContenedorCarrito y actualizarContenidoPrecioFinal y asignar el contenido HTML devuelto
            contenidoHTML = actualizarContenidoCarrito() + actualizarContenidoPrecioFinal();
            contenedorCarrito.innerHTML = contenidoHTML;
            
        })
        // Llamar a la función agregarEventoEliminarProducto
        agregarEventoEliminarProducto();
        mostrarPrecioFinal();
        mostrarPrecioProducto();


        finalizarCompra();
}