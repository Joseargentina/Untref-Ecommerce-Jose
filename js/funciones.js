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
    // Verificar si el producto ya está en el carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        productoExistente.cantidad++;
        console.log('El producto ya está en el carrito');
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        const productoSeleccionado = {
            id: producto.id,
            titulo: producto.titulo,
            precio: producto.precio,
            img: producto.img,
            cantidad: 1
        };
        carrito.push(productoSeleccionado);
        console.log('Producto agregado al carrito');
    }
    
    // Actualizar el contador de productos en el localStorage y en la página
    let contador = parseInt(localStorage.getItem('contadorProductos')) || 0;
    contador++;
    localStorage.setItem('contadorProductos', contador);
    document.getElementById('contadorProductos').textContent = contador;
    
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(carrito);
}

//funcion para recorrer cada producto del array productos y se muestren en la pantalla
export function recorrerProductos (productos) {
    let contenedorProductos = document.getElementById('contenedor-productos');

    //Obtener el valor actual del contador del localStorage
    let contador = parseInt(localStorage.getItem('contadorProductos')) || 0;

    //Actualizar el contador en la pagina
    let contadorProductos = document.getElementById('contadorProductos');
    contadorProductos.textContent = contador;
    console.log(contadorProductos);

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
        precioProducto.textContent = 'Precio $' + producto.precio;
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


        // Evento de click para agregar al carrito
        btnAgregarAlCarrito.addEventListener('click', function () {
            agregarAlCarrito(producto);
        });
        figcaption.appendChild(btnAgregarAlCarrito);

        contenedorProducto.appendChild(figure);
        contenedorProducto.appendChild(figcaption);
        contenedorProductos.appendChild(contenedorProducto);
    })

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
                <p>cantidad: ${producto.cantidad}</p>
                <li>Precio: $${producto.precio}</li>
                <i class="fa-solid fa-trash-can btn-eliminar"></i>
            </figcaption>
        </article>
        `;
    });
    return contenidoHTML; // Devuelve el contenido HTML generado
}

//Funcion para eliminar un producto
export function eliminarProducto(indice) {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    console.log(indice);    
    carrito.splice(indice, 1);
    actualizarContenidoCarrito();
}

