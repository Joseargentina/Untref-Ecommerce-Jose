import { traerDatos, actualizarContenidoCarrito } from './funciones.js';

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
    } else {
        carrito.forEach(function (producto) {
            // Llamar a la funcion actualizarContenedorCarrito y asignar el contenido HTML devuelto
            contenidoHTML = actualizarContenidoCarrito();

            // Agregar el contenido HTML al contenedor
            contenedorCarrito.innerHTML = contenidoHTML;

            const contenedorPrecio = document.createElement('article');
            contenedorPrecio.className = 'contenedor-producto contenedor-total-productos';
            contenedorCarrito.appendChild(contenedorPrecio);
            contenedorPrecio.innerHTML = `
                    <h3>Total Productos</h3>
                    <span class="precio-final">$ 151515</span>`;
            const contenedorFinalizar = document.createElement('form');
            contenedorFinalizar.className = 'contenedor-producto contenedor-finalizar-compra';
            contenedorCarrito.appendChild(contenedorFinalizar);
            contenedorFinalizar.innerHTML = `
                    <button type=submit class="btn btn-finalizar-compra">Finalizar compra</button>`;
            const btnFinalizarCompra = document.querySelector(".btn-finalizar-compra");
            
            //Agregar evento de click al boton de finalizar compra
            btnFinalizarCompra.addEventListener('click', function(e){
                e.preventDefault();
                console.log(e.target)
            });
        });

        function agregarEventoEliminarProducto() {
            const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
            const contenedorCarrito = document.getElementById('contenedor-carrito');
            
            //Agrego evento de click al contenedorCarrito
            contenedorCarrito.addEventListener('click', function (e) {
                //Si el click se hace sobre el btn-eliminar
                if (e.target.classList.contains('btn-eliminar')) {
                    e.preventDefault();
                    const carrito = JSON.parse(localStorage.getItem('carrito'));
                    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
                    // Obtener el índice del elemento actual dentro de la lista de botonesEliminar
                    const indiceEliminar = Array.from(botonesEliminar).indexOf(e.target);
                    let contadorProductos = document.getElementById('contadorProductos');
                    
                    if (indiceEliminar !== -1) {
                        if (carrito[indiceEliminar].cantidad > 1) {
                            carrito[indiceEliminar].cantidad--;
                            localStorage.setItem('carrito', JSON.stringify(carrito));
                            contenidoHTML = actualizarContenidoCarrito();
                        } else {
                            carrito.splice(indiceEliminar, 1);
                            localStorage.setItem('carrito', JSON.stringify(carrito));
                            contenidoHTML = actualizarContenidoCarrito();
                        }
                    }
                    
                    contenidoHTML = actualizarContenidoCarrito();
                    contenedorCarrito.innerHTML = contenidoHTML;
                    //Suma de la cantidad total de productos
                    const sumaCantidades = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
                    contadorProductos.textContent = sumaCantidades;
                    
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    localStorage.setItem('contadorProductos', sumaCantidades);
                    console.log(sumaCantidades)
                    console.log(carrito);
                }
            });
        }
        // Llamar a la función agregarEventoEliminarProducto fuera del bucle forEach
        agregarEventoEliminarProducto();
    }
