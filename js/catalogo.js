const contenedor = document.getElementById('contenedor-productos');

function cargarProductos() {
    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="info-tarjeta">
                <div>
                    <h3>${producto.nombre}</h3>
                    <p class="precio">$${producto.precio.toLocaleString('es-CL')}</p>
                </div>
                <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

cargarProductos();