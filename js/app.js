class CifradoCesarApp {
    constructor() {
        this.cifrador = new CifradoCesar();
        this.ui = new UI();
        this.nombreUsuario = '';
        
        this.initializeApp();
    }

    initializeApp() {
        this.bindEvents();
        this.ui.mostrarPantallaBienvenida();
    }

    bindEvents() {
        // Botones de acción principal
        document.getElementById('btnCifrar').addEventListener('click', () => this.procesarTexto('cifrar'));
        document.getElementById('btnDescifrar').addEventListener('click', () => this.procesarTexto('descifrar'));
        document.getElementById('btnLimpiar').addEventListener('click', () => this.limpiar());

        // Enter en el campo de nombre
        document.getElementById('nombreUsuario').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.ui.mostrarPantallaPrincipal();
            }
        });

        // Enter en el campo de texto
        document.getElementById('textoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.procesarTexto('cifrar');
            }
        });
    }

    procesarTexto(accion) {
        const texto = document.getElementById('textoInput').value;
        const desplazamiento = parseInt(document.getElementById('desplazamientoInput').value);

        if (!texto.trim()) {
            this.ui.mostrarError('Por favor, ingresa algún texto para procesar.');
            return;
        }

        try {
            const { resultado, explicacion } = this.cifrador.procesar(texto, desplazamiento, accion);
            const explicacionHTML = this.cifrador.generarExplicacionTexto(explicacion, accion);
            
            this.ui.mostrarResultado(resultado, explicacionHTML, accion);

        } catch (error) {
            this.ui.mostrarError('Error al procesar el texto: ' + error.message);
        }
    }

    limpiar() {
        this.ui.limpiarResultados();
    }

    getNombreUsuario() {
        return this.nombreUsuario;
    }

    setNombreUsuario(nombre) {
        this.nombreUsuario = nombre;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new CifradoCesarApp();
});