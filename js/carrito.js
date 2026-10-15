function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
}

function actualizarContador() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        const total = obtenerCarrito().reduce((suma, item) => suma + item.cantidad, 0);
        contador.innerText = total;
    }
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id === id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }
    guardarCarrito(carrito);
    alert(`¡${producto.nombre} añadido al carrito!`);
}

document.addEventListener('DOMContentLoaded', actualizarContador);