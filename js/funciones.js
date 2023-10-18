//Funcion para traer los datos de los productos del archivo productos.json 
export function traerDatos() {
    return fetch('data/productos.json')
        .then(respuesta => respuesta.json())
        .catch(error => {
            console.log(datos);
        });
}


//funcion para obtener los detalles de los productos
export function obtenerDetallesProducto(productId) {
    return traerDatos()
        .then(function (datos) {
        // Buscar el producto correspondiente al ID
        const producto = datos.find(producto => producto.id === productId);
        if (producto) {
            return producto;
        } else {
            throw new Error('No se encontró el producto con ID:', productId);
        }
    })
    .catch(error => {
        console.error('Error al obtener los detalles del producto:', error);
    });
}

// Función para agregar un producto al carrito
export function agregarAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad++;
        Swal.fire({
            title: 'Producto agregado al carrito',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Finalizar compra',
            cancelButtonText: 'Seguir comprando'
        }).then((result) => {
            if (result.isConfirmed) {
                finalizarCompra();
            }
        });
    } else {
        const productoSeleccionado = {
            id: producto.id,
            titulo: producto.titulo,
            precio: producto.precio,
            img: producto.img,
            cantidad: 1
        };
        carrito.push(productoSeleccionado);
        Swal.fire({
            title: 'Producto agregado al carrito',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Finalizar compra',
            cancelButtonText: 'Seguir comprando'
        }).then((result) => {
            if (result.isConfirmed) {
                finalizarCompra();
            }
        });
    }
    let contador = parseInt(localStorage.getItem('contadorProductos')) || 0;
    contador++;
    localStorage.setItem('contadorProductos', contador);
    document.getElementById('contadorProductos').textContent = contador;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(carrito);
}

//funcion para recorrer cada producto del array productos y se muestren en la pantalla
export function recorrerProductos (productos) {
    let contenedorProductos = document.getElementById('contenedor-productos');

    //Obtener el valor actual del contador del localStorage
    let contador = parseInt(localStorage.getItem('contadorProductos')) || 0;

    //Actualizar el contador de productos de la pagina
    let contadorProductos = document.getElementById('contadorProductos');
    contadorProductos.textContent = contador;
    console.log(contadorProductos);

    productos.forEach(function(producto) {
        let contenedorProducto = document.createElement('article');
        contenedorProducto.className = 'producto';

        contenedorProducto.innerHTML = `
            <figure>
                <img src="${producto.img}" alt="Imagen del producto">
            </figure>
            <figcaption>
                <h3>${producto.titulo}</h3>
                <ul>
                    ${producto.descripcion.map(descripcion => `<li>${descripcion}</li>`).join('')}
                </ul>
                <p class="precio-producto">Precio $${producto.precio}</p>
                <button class="btn-detalle btn" onclick="window.location.href='detail.html?id=${producto.id}'">Ver Detalle</button>
                
            </figcaption>
        `;

        contenedorProductos.appendChild(contenedorProducto);
        let btnAgregarAlCarrito = document.createElement('button');
        btnAgregarAlCarrito.className = 'btn-agregar-carrito btn';
        btnAgregarAlCarrito.textContent = 'Agregar Al Carrito';

        //Agrego un evento de click al boton agregar al carrito que llama a la funcion agregarAlCarrito
        btnAgregarAlCarrito.addEventListener('click', function () {
            agregarAlCarrito(producto);
        });

        contenedorProducto.querySelector('figcaption').appendChild(btnAgregarAlCarrito);

    });
    
}

//Funcion para actualizar los productos del carrito
export function actualizarContenidoCarrito(){
    let contenidoHTML = '';
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    console.log(carrito);
    carrito.forEach(function (producto){
        contenidoHTML += `
        <article class="contenedor-producto">
            <figure>
                <img class="img-carrito" src="${producto.img}">
            </figure>
            <figcaption>
                <h3>${producto.titulo}</h3>
                <p class="producto-cantidad">cantidad: ${producto.cantidad}</p>
                <li class="precio-producto-final" data-nombre="producto1">Total ${producto.precio}</li>
                <i class="fa-solid fa-trash-can btn-eliminar"></i>
            </figcaption>
        </article>
        `;
    });
    
    return contenidoHTML; // Devuelve el contenido HTML generado
}

//Funcion para actualizar los productos del carrito
export function actualizarContenidoPrecioFinal(){
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    let contenidoHTMLprecioFinal = '';
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    console.log(carrito);
        contenidoHTMLprecioFinal += `
        <article class="contenedor-producto contenedor-total-productos">
            <h3>Total Productos</h3>
            <span class="precio-final">$ 15151</span>
        </article>
        <form class=" contenedor-finalizar-compra">
                <button type=submit class="btn btn-finalizar-compra">Finalizar compra</button>
        </form>
        `;
    return contenidoHTMLprecioFinal; // Devuelve el contenido HTML generado
}

//Funcion para agregar evento de eliminar a los productos
let contenidoHTML = ''; //variable para almacenar el contenido HTML del contenedor-carrito
export function agregarEventoEliminarProducto() {
    const contenedorCarrito = document.getElementById('contenedor-carrito');

    //Agrego evento de click al contenedorCarrito
    contenedorCarrito.addEventListener('click', function (e) {
        //Si el click se hace sobre el btn-eliminar
        if (e.target.classList.contains('btn-eliminar')) {
            e.preventDefault();
            const carrito = JSON.parse(localStorage.getItem('carrito'));
            const botonesEliminar = document.querySelectorAll('.btn-eliminar');
            // Obtener el índice del elemento actual dentro de la lista de botonesEliminar
            const indiceEliminar = Array.from(botonesEliminar).indexOf(e.target);//Devuel -1 si encuentra el indice
            
            if (indiceEliminar !== -1) {
                if (carrito[indiceEliminar].cantidad > 1) {
                    carrito[indiceEliminar].cantidad--;
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    mostrarPrecioProducto();
                    mostrarPrecioFinal();
                } else {
                    carrito.splice(indiceEliminar, 1);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                }
            }
            
            contenidoHTML = actualizarContenidoCarrito() ;
            if (carrito.length > 0) {
                contenidoHTML += actualizarContenidoPrecioFinal();
                contenedorCarrito.innerHTML = contenidoHTML;
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El carrito se encuentra vacio!'
                });
                contenedorCarrito.innerHTML = contenidoHTML;
                //Obtener el valor actual del contador del localStorage
                let contadorProductos = document.getElementById('contadorProductos');
                // Actualizar el valor del contador en el localStorage y en el HTML
                let contador = localStorage.setItem('contadorProductos', 0);
                contadorProductos.textContent = 0;
                return; // Evitar llamar a las funciones mostrarPrecioFinal() y mostrarPrecioProducto()
            }
            
            //Suma de la cantidad total de productos
            const sumaCantidades = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
            contadorProductos.textContent = sumaCantidades;
            
            localStorage.setItem('carrito', JSON.stringify(carrito));
            localStorage.setItem('contadorProductos', sumaCantidades);
            console.log(sumaCantidades)
            console.log(carrito);
        }
        mostrarPrecioFinal();
        mostrarPrecioProducto();
    });
}

//Funcion para finalizar la compra
export function finalizarCompra() {
        // Mostrar una ventana emergente para solicitar el nombre de usuario y el número de tarjeta de crédito
        Swal.fire({
            title: 'Ingrese su nombre de usuario y número de tarjeta de crédito',
            html:
            '<form>' +
            '<input id="username" class="swal2-input" autocomplete="current-password" placeholder="Nombre de usuario">' +
            '<input id="target-credit" type="password" autocomplete="current-password" class="swal2-input" placeholder="Número de tarjeta de crédito">' +
            '</form>',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const username = Swal.getPopup().querySelector('#username').value;
                const targetCredit = Swal.getPopup().querySelector('#target-credit').value;
                if (!username || !targetCredit) {
                    Swal.showValidationMessage('Debe ingresar tanto el nombre de usuario como el número de tarjeta de crédito');
                }
                return { username: username, targetCredit: targetCredit };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const username = result.value.username;
                const targetCredit = result.value.targetCredit;
                // Guardar los datos en el localStorage
                localStorage.setItem("username", username);
                localStorage.setItem("targetCredit", targetCredit);
                // Realizar acciones adicionales al finalizar la compra
                // Aquí puedes agregar tu lógica personalizada utilizando el nombre de usuario y el número de tarjeta de crédito
                console.log(`Compra finalizada por ${username} con número de tarjeta de crédito ${targetCredit}`);
                Swal.fire({
                    title: '¡Felicidades!',
                    text: '¡Has finalizado tu compra!',
                    icon: 'success'
                }).then(() => {
                    
                    // Limpiar el valor del contador en el localStorage
                    localStorage.removeItem('contadorProductos');
                    //remover lo que se guardo en el localstorage del carrito
                    localStorage.removeItem('carrito');

                    //Actualizo el contenedor del carrito
                    if(document.getElementById('contenedor-carrito') ) {
                        document.getElementById('contenedor-carrito').innerHTML = '';
                    }
                    
                    // Actualizar el contador de productos y establecerlo en 0
                    const contadorProductos = document.getElementById('contadorProductos');
                    contadorProductos.textContent = "0";
                });
            }
        });
}

// Funcion para sumar el total de los productos
export function sumarProductos (){
    const carrito =JSON.parse(localStorage.getItem('carrito'));
    // Obtener los precios de los productos en el carrito
    const precios = carrito.map(producto => producto.precio * producto.cantidad);

    // Calcular la suma total de los precios
    const sumaTotal = precios.reduce((suma, precio) => suma + precio, 0);

    // Mostrar la suma total en el contenedor adecuado
    const contenedorSumaTotal = document.querySelector('.precio-final');
    contenedorSumaTotal.innerHTML = `${sumaTotal}`;

    return sumaTotal;
}


// Mostrar la suma total en el elemento span de precio final
export function mostrarPrecioFinal() {
    // Obtengo el elemento para mostrar el precio final
    const precioFinalProducto = document.querySelector('.precio-final');
    const sumaTotal = sumarProductos();
    precioFinalProducto.textContent = `$ ${sumaTotal}`;
    }

//Funcion para mostrar el precio final
    export function mostrarPrecioProducto() {
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        const precioFinalProductos = document.querySelectorAll('.precio-producto-final');
        carrito.forEach((elemento, index) => {
            const nombreProducto = elemento.titulo;
            const cantidadProducto = elemento.cantidad;
            const precioProducto = elemento.precio;
            const subtotalProducto = precioProducto * cantidadProducto; // Si cantidadProducto es undefined, se asigna 0
        
                precioFinalProductos[index].textContent = `Total $${subtotalProducto}`;
            
        });
    }