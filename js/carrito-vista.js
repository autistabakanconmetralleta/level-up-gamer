const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');

function mostrarCarrito() {
    const carrito = obtenerCarrito();
    listaCarrito.innerHTML = '';
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalCarrito.innerText = '$0';
        return;
    }
    carrito.forEach(item => {
        const fila = document.createElement('div');
        fila.className = 'fila-carrito';
        fila.innerHTML = `
            <div>
                <h3>${item.nombre}</h3>
                <p class="precio">$${item.precio.toLocaleString('es-CL')}</p>
            </div>
            <div class="controles-cantidad">
                <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
            </div>
            <p>$${(item.precio * item.cantidad).toLocaleString('es-CL')}</p>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        listaCarrito.appendChild(fila);
    });
    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    totalCarrito.innerText = '$' + total.toLocaleString('es-CL');
}

function cambiarCantidad(id, cambio) {
    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === id);
    item.cantidad += cambio;
    guardarCarrito(carrito.filter(i => i.cantidad > 0));
    mostrarCarrito();
}

function eliminarDelCarrito(id) {
    guardarCarrito(obtenerCarrito().filter(i => i.id !== id));
    mostrarCarrito();
}

mostrarCarrito();