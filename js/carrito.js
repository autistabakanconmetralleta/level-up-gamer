function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function actualizarContador() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.innerText = obtenerCarrito().length;
    }
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const carrito = obtenerCarrito();
    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    alert(`¡${producto.nombre} añadido al carrito!`);
}

document.addEventListener('DOMContentLoaded', actualizarContador);