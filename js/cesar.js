class CifradoCesar {
    constructor() {
        this.abecedario = 'abcdefghijklmnopqrstuvwxyz';
        this.abecedarioMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    procesar(texto, desplazamiento, accion = 'cifrar') {
        if (!texto.trim()) {
            return { resultado: '', explicacion: [] };
        }

        let resultado = '';
        const explicacion = [];
        
        // Para "descifrar", usamos el desplazamiento negativo
        const despl = accion === 'descifrar' ? -desplazamiento : desplazamiento;

        for (let i = 0; i < texto.length; i++) {
            const caracter = texto[i];
            let nuevoCaracter = caracter;
            let pasoExplicacion = {
                original: caracter,
                nuevo: caracter,
                desplazamiento: despl,
                tipo: 'especial'
            };

            if (this.abecedario.includes(caracter)) {
                // Minúsculas
                const indiceOriginal = this.abecedario.indexOf(caracter);
                const nuevoIndice = this.calcularNuevoIndice(indiceOriginal, despl);
                nuevoCaracter = this.abecedario[nuevoIndice];
                
                pasoExplicacion = {
                    original: caracter,
                    nuevo: nuevoCaracter,
                    codigoOriginal: caracter.charCodeAt(0),
                    codigoNuevo: nuevoCaracter.charCodeAt(0),
                    indiceOriginal: indiceOriginal,
                    nuevoIndice: nuevoIndice,
                    desplazamiento: despl,
                    tipo: 'minuscula'
                };
            } else if (this.abecedarioMayusculas.includes(caracter)) {
                // Mayúsculas
                const indiceOriginal = this.abecedarioMayusculas.indexOf(caracter);
                const nuevoIndice = this.calcularNuevoIndice(indiceOriginal, despl);
                nuevoCaracter = this.abecedarioMayusculas[nuevoIndice];
                
                pasoExplicacion = {
                    original: caracter,
                    nuevo: nuevoCaracter,
                    codigoOriginal: caracter.charCodeAt(0),
                    codigoNuevo: nuevoCaracter.charCodeAt(0),
                    indiceOriginal: indiceOriginal,
                    nuevoIndice: nuevoIndice,
                    desplazamiento: despl,
                    tipo: 'mayuscula'
                };
            }

            resultado += nuevoCaracter;
            explicacion.push(pasoExplicacion);
        }

        return { resultado, explicacion };
    }

    calcularNuevoIndice(indiceOriginal, desplazamiento) {
        let nuevoIndice = (indiceOriginal + desplazamiento) % 26;
        if (nuevoIndice < 0) {
            nuevoIndice += 26;
        }
        return nuevoIndice;
    }

    generarExplicacionTexto(explicacion, accion) {
        if (explicacion.length === 0) {
            return '<p class="text-muted">Ingresa texto para ver la explicación...</p>';
        }

        let html = '<div class="explicacion-detallada">';
        
        explicacion.forEach((paso, index) => {
            if (paso.tipo === 'especial') {
                html += `
                    <div class="paso-especial">
                        <strong>"${paso.original}"</strong> → carácter especial (se mantiene igual)
                    </div>
                `;
            } else {
                const tipoLetra = paso.tipo === 'mayuscula' ? 'mayúscula' : 'minúscula';
                const accionTexto = paso.desplazamiento > 0 ? 'Avanzar' : 'Retroceder';
                html += `
                    <div class="paso-letra">
                        <div class="letra-info">
                            <span class="letra-original">"${paso.original}"</span> 
                            <i class="fas fa-arrow-right"></i>
                            <span class="letra-nueva">"${paso.nuevo}"</span>
                        </div>
                        <div class="letra-detalle">
                            <small>
                                ${tipoLetra} | 
                                Código: ${paso.codigoOriginal} → ${paso.codigoNuevo} | 
                                Índice: ${paso.indiceOriginal} → ${paso.nuevoIndice} |
                                ${accionTexto}: ${Math.abs(paso.desplazamiento)} posiciones
                            </small>
                        </div>
                    </div>
                `;
            }
        });

        html += '</div>';
        return html;
    }
}