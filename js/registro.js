const dominiosValidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

function valor(id) {
    return document.getElementById(id).value.trim();
}

function runValido(run) {
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toUpperCase();
    let suma = 0;
    let multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const resto = 11 - (suma % 11);
    const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
    return dv === esperado;
}

function correoValido(correo) {
    const partes = correo.split('@');
    return partes.length === 2 && partes[0].length > 0 && dominiosValidos.includes('@' + partes[1]);
}

const reglas = {
    run: () => {
        const run = valor('run');
        if (run === '') return 'El RUN es obligatorio.';
        if (run.length < 7 || run.length > 9) return 'El RUN debe tener entre 7 y 9 caracteres.';
        if (!/^[0-9]+[0-9kK]$/.test(run)) return 'Escribe el RUN sin puntos ni guion. Solo números y K al final.';
        if (!runValido(run)) return 'El RUN no es válido. Revisa el dígito verificador.';
        return '';
    },
    nombre: () => {
        const nombre = valor('nombre');
        if (nombre === '') return 'El nombre es obligatorio.';
        if (nombre.length > 50) return 'El nombre no puede superar los 50 caracteres.';
        return '';
    },
    apellidos: () => {
        const apellidos = valor('apellidos');
        if (apellidos === '') return 'Los apellidos son obligatorios.';
        if (apellidos.length > 100) return 'Los apellidos no pueden superar los 100 caracteres.';
        return '';
    },
    correo: () => {
        const correo = valor('correo');
        if (correo === '') return 'El correo es obligatorio.';
        if (correo.length > 100) return 'El correo no puede superar los 100 caracteres.';
        if (!correoValido(correo)) return 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        return '';
    },
    contrasena: () => {
        const contrasena = document.getElementById('contrasena').value;
        if (contrasena === '') return 'La contraseña es obligatoria.';
        if (contrasena.length < 4 || contrasena.length > 10) return 'La contraseña debe tener entre 4 y 10 caracteres.';
        return '';
    },
    confirmarContrasena: () => {
        const confirmar = document.getElementById('confirmarContrasena').value;
        if (confirmar === '') return 'Confirma tu contraseña.';
        if (confirmar !== document.getElementById('contrasena').value) return 'Las contraseñas no coinciden.';
        return '';
    },
    telefono: () => {
        const telefono = valor('telefono');
        if (telefono === '') return '';
        if (!/^\+?[0-9]{9,11}$/.test(telefono)) return 'Escribe un teléfono de 9 a 11 dígitos, solo números.';
        return '';
    },
    fechaNacimiento: () => {
        const fecha = valor('fechaNacimiento');
        if (fecha === '') return '';
        if (new Date(fecha) > new Date()) return 'La fecha de nacimiento no puede ser futura.';
        return '';
    },
    region: () => valor('region') === '' ? 'Selecciona una región.' : '',
    comuna: () => valor('comuna') === '' ? 'Selecciona una comuna.' : '',
    direccion: () => {
        const direccion = valor('direccion');
        if (direccion === '') return 'La dirección es obligatoria.';
        if (direccion.length > 300) return 'La dirección no puede superar los 300 caracteres.';
        return '';
    }
};

function mostrarError(id, mensaje) {
    const campo = document.getElementById(id);
    const error = document.getElementById('err-' + id);
    error.innerText = mensaje;
    error.style.display = mensaje ? 'block' : 'none';
    campo.classList.toggle('campo-invalido', mensaje !== '');
    campo.classList.toggle('campo-valido', mensaje === '' && campo.value !== '');
}

function validarCampo(id) {
    const mensaje = reglas[id]();
    mostrarError(id, mensaje);
    return mensaje === '';
}

const selectRegion = document.getElementById('region');
const selectComuna = document.getElementById('comuna');

regiones.forEach(region => {
    const opcion = document.createElement('option');
    opcion.value = region.nombre;
    opcion.textContent = region.nombre;
    selectRegion.appendChild(opcion);
});

selectRegion.addEventListener('change', () => {
    selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
    const region = regiones.find(r => r.nombre === selectRegion.value);
    if (region) {
        region.comunas.forEach(comuna => {
            const opcion = document.createElement('option');
            opcion.value = comuna;
            opcion.textContent = comuna;
            selectComuna.appendChild(opcion);
        });
    }
    validarCampo('region');
    mostrarError('comuna', '');
});

Object.keys(reglas).forEach(id => {
    const campo = document.getElementById(id);
    campo.addEventListener('input', () => validarCampo(id));
    campo.addEventListener('blur', () => validarCampo(id));
    campo.addEventListener('change', () => validarCampo(id));
});

document.getElementById('contrasena').addEventListener('input', () => {
    if (document.getElementById('confirmarContrasena').value !== '') validarCampo('confirmarContrasena');
});

document.getElementById('formReg').addEventListener('submit', function (e) {
    e.preventDefault();
    let primerError = null;
    Object.keys(reglas).forEach(id => {
        if (!validarCampo(id) && !primerError) primerError = id;
    });
    if (primerError) {
        document.getElementById(primerError).focus();
        return;
    }
    alert('¡Usuario registrado con éxito!');
    window.location.href = 'index.html';
});