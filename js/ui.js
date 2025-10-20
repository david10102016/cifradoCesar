class UI {
    constructor() {
        this.screens = {
            bienvenida: document.getElementById('bienvenida'),
            principal: document.getElementById('principal'),
            despedida: document.getElementById('despedida')
        };
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Navegación
        document.getElementById('btnComenzar').addEventListener('click', () => this.mostrarPantallaPrincipal());
        document.getElementById('btnReiniciar').addEventListener('click', () => this.mostrarPantallaBienvenida());
        document.getElementById('btnNuevoIntento').addEventListener('click', () => this.mostrarPantallaPrincipal());

        // Menu toggle para móviles
        document.querySelector('.menu-toggle').addEventListener('click', () => this.toggleMenuMovil());

        // Sincronización range y number input
        const range = document.getElementById('desplazamientoRange');
        const number = document.getElementById('desplazamientoInput');
        
        range.addEventListener('input', () => {
            number.value = range.value;
        });
        
        number.addEventListener('input', () => {
            range.value = number.value;
        });
    }

    mostrarPantallaBienvenida() {
        this.ocultarTodasPantallas();
        this.screens.bienvenida.classList.add('active');
    }

    mostrarPantallaPrincipal() {
        const nombre = document.getElementById('nombreUsuario').value.trim() || 'Visitante';
        this.actualizarSaludoPersonalizado(nombre);
        
        this.ocultarTodasPantallas();
        this.screens.principal.classList.add('active');
        
        // Limpiar resultados anteriores
        this.limpiarResultados();
    }

    mostrarPantallaDespedida() {
        const nombre = document.getElementById('nombreUsuario').value.trim() || 'Visitante';
        this.actualizarMensajeDespedida(nombre);
        
        this.ocultarTodasPantallas();
        this.screens.despedida.classList.add('active');
    }

    ocultarTodasPantallas() {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
    }

    actualizarSaludoPersonalizado(nombre) {
        document.getElementById('nombreDisplay').textContent = nombre;
        document.getElementById('saludoPersonalizado').innerHTML = 
            `Hola, <span id="nombreDisplay">${nombre}</span> <i class="fas fa-hand-sparkles"></i>`;
    }

    actualizarMensajeDespedida(nombre) {
        const mensaje = `¡${nombre}, gracias por participar!`;
        document.getElementById('mensajeDespedida').textContent = mensaje;
    }

    toggleMenuMovil() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    }

    mostrarResultado(resultado, explicacion, accion) {
        const resultadoOutput = document.getElementById('resultadoOutput');
        const explicacionOutput = document.getElementById('explicacionOutput');
        
        // Mostrar resultado
        resultadoOutput.innerHTML = `
            <div class="resultado-${accion === 'cifrar' ? 'success' : 'info'}">
                <h4>${accion === 'cifrar' ? '🔒 Texto Cifrado' : '🔓 Texto Descifrado'}</h4>
                <p class="resultado-texto">${resultado}</p>
            </div>
        `;

        // Mostrar explicación
        explicacionOutput.innerHTML = explicacion;
    }

    limpiarResultados() {
        document.getElementById('resultadoOutput').innerHTML = '';
        document.getElementById('explicacionOutput').innerHTML = '';
        document.getElementById('textoInput').value = '';
    }

    mostrarError(mensaje) {
        // Implementación básica de manejo de errores
        console.error(mensaje);
        alert(mensaje);
    }
}
