# PROYECTO INTEGRADOR UNTREFSCHOOL

## Proyecto integrador E-commerce de desarrollo web

Este proyecto integrador es sobre una tienda online de venta de taladros a bateria. El diseño está orientado primero en dispositivos móviles de 320px con dos puntos de quiebre uno a 768px y otro a 1024px.

En la página principal en la parte superior se muestra el titulo de la pagina, el icono del home y el icono del carrito con un contador de productos, mas abajo se muestran los productos que estan a la venta,  y un pie de página. Si se hace click en el carrito te redirige a la pagina del carrito,en la card del producto si se hace click en ver detalle te redirige a la pagina de detalle.html y si se da click en agregar al carrito se añade el producto al carrito y te pregunta si deseas finalizar la compra o quieres seguir comprando.

En la vista de 320px, el contenido se muestra en una fila. En la vista de 768px, el contenido se divide en dos columnas. En la vista de 1024px, las productos se muestran en tres columnas.

Los dos puntos de quiebre se utilizan para adaptar el diseño del sitio web a diferentes tamaños de pantalla. En la vista de 768px, el contenido se divide en dos columnas para que sea más fácil de leer en una pantalla más grande. En la vista de 1024px, las secciones se muestran en tres columnas.

## La parte de Javascript 

### en el index.js empieza con :
  * una funcion para traer los datos de los productos del archivo productos.json
  * despues hago una funcion para recorrer cada producto del array productos que y se muestren en la pantalla despues hago una funcion de onclick al boton Ver detalle para redirigir a la pagina detail.html pasandole el id del producto que se hizo click, despues agrego en evento de click al boton agregar al carrito, dentro de este evento se llama a la funcion agregarAlCarrito() esta obtiene los datos guardados en el local Storage del carrito, pregunto si el producto que se selecciono existe en el carrito si ya esta en el carrito aumenta la cantidad y sale un mensaje que dice producto agregado al carrito y pregunta si desea seguir comprando o finalizar la compra si el usuario elige finalizar la compra se llama a la funcion finalizarCompra() y si el producto no esta en el carrito se agrega  al carrito y nuevmente pregunta si desea seguir comprando o finaizar compra despues se guardan los datos en el local storage
  * y por ultimo selecciono el icono del carrito y agrego un evento de click para que me rediriga a cart.html cuando se de clik en el

### La parte de detil.js empieza con:
 * Obteniendo el Id del producto que se hizo click en ver detalle en index.html
 * La función "obtenerDetallesProducto" y toma un parámetro llamado "productId", que es el identificador del producto. La función devuelve una promesa que se resuelve con los detalles del producto.
 Dentro de la promesa, se utiliza el método "then" para ejecutar una función que recibe el producto como argumento. En este caso, la función se encarga de imprimir los detalles del producto en el archivo "detail.html" utilizando la función "imprimirDetalles". 
 * En la funcion imprimirDetalles() se imprime el producto que se selecciono para ver detalle y se agrega una descripcion mas avanzada, tambien agrego unas estrellas de clasificacion segun el precio del producto, tambien agrego en evento de click al boton agregar al carrito que llama a la funcion agregarAlCarrito().

 ### La parte de cart.js empieza con:
 * Uso la funcion traerDatos() para obtener los datos de los productos
 * Obtengo la cantidad total de productos guardados en el localStorage y los productos que esten guardados del carrito
 * Si el carrito no es un array o  el carrito es iguall a 0 sale un mensaje que dice que el carrito esta vacio, sino esta vacio recorro el carrito con un forEach para obtener los datos de los productos, llamo a la funcion actualizarContenidoCarrito() y a actualizarContenidoPrecioFinal() 
 * despues de recorrer los productos llamo a la funcion agregarEventoEliminarProducto() la cual se encarga de darle un evento de click al boton elimiar para eliminar la cantidad o el producto si la cantidad es 1.
 * despues llamo a la funcion mostrarPrecioFinal() obtiene el elemento HTML donde se mostrara el precio final y llama a la funcion sumarProductos() que se encarga de sumar el total de los productos 
 * despues llamo a la funcion mostrarPrecioProducto(); que se encarga de mostrar el precio final de cada producto en el carrito de compras

 ### funciones.js tengo las funciones:
* traerDatos() Funcion para traer los datos de los productos del archivo productos.json 
* obtenerDetallesdelProducto() funcion para obtener los detalles de los productos
* agregarALCarrtito() Función para agregar un producto al carrito
* recorrerProductos() funcion para recorrer cada producto del array productos y se muestren en la pantalla
* actualizarContenidoCarrito() Funcion para actualizar los productos del carrito
* agregarEventoEliminarProducto() Funcion para agregar evento de eliminar a los productos
* sumarProductos() Funcion para sumar el total de los productos
* mostrarPrecioFinal() Mostrar la suma total en el elemento span de precio final
* mostrarPrecioProducto() Funcion para mostrar el precio final del producto
* finalizarCompra() Funcion para finalizar la compra

### Utilice

* HTML
* CSS
* JavaScript

### Puedes acceder a él en la siguiente URL

https://github.com/Joseargentina/Untref-Ecommerce-Jose.git