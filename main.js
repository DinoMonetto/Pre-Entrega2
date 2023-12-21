const juegoAhorcado = {
    palabras: ["rulo", "diecinueve", "ahorcado", "ganar", "perro", "gato", "dificil", "juego"],
    palabraSeleccionada: "",
    letrasUtilizadas: [],
    intentosRestantes: 5,
    inicializar() {
        console.log("El juego ha iniciado")
        this.palabraSeleccionada = this.palabras[Math.floor(Math.random() * this.palabras.length)]
        this.mostrarPalabra()
    },

    mostrarPalabra() {
        const palabraMostrada = this.palabraSeleccionada.split('').map(char => {
            return this.letrasUtilizadas.includes(char) ? char : "_"
        }).join(" ")
        alert("Palabra: " + palabraMostrada)
        if (!palabraMostrada.includes("_")) {
            alert("Ganaste! la palabra era: " + this.palabraSeleccionada);
            this.reiniciarJuego();
            return; 
        }
    },

    comprobarLetra() {
        let letra = ""
        
        // Si hay mas de una letra, sigue pidiendo una entrada.
        while (letra.length !== 1) {
            letra = prompt("Introduce una letra:").toLowerCase()
    
            // Verifica si se canceló el prompt o se cerró, si es así, termina.
            if (letra === null) return
    
            if (letra.length !== 1) {
                alert("Por favor, ingresa solo una letra.")
            }
        }
    
        if (this.letrasUtilizadas.includes(letra)) {
            console.log("La letra ya se utilizó:", letra);
            alert("Ya probaste con esa letra. Intenta con otra!")
            return
        }
    
        this.letrasUtilizadas.push(letra);
    
        if (!this.palabraSeleccionada.includes(letra)) {
            this.intentosRestantes--
            alert("Incorrecto, '" + letra + "' no está en la palabra.")
            alert("Letras utilizadas: " + this.letrasUtilizadas.join(", ") + "\nIntentos restantes: " + this.intentosRestantes)
            
            if (this.intentosRestantes === 0) {
                alert("¡Perdiste! La palabra era: " + this.palabraSeleccionada)
                this.reiniciarJuego()
            } else {
                this.mostrarPalabra()
            }
        } else {
            alert("Correcto! La letra '" + letra + "' está en la palabra.")
            this.mostrarPalabra()
        }
    },

    reiniciarJuego() {
        // para reiniciar
        const reiniciar = confirm("jugamos de nuevo?")
        if (reiniciar) {
            this.letrasUtilizadas = []
            this.intentosRestantes = 5
            this.inicializar()
        } else {
            alert("Adios!")
            // Para finalizar
        }
    },
}

console.log("Lista de palabras disponibles:", juegoAhorcado.palabras);

// Mostrar un mensaje de bienvenida cuando la página se cargue
window.onload = () => {
    alert("Bienvenido al juego del ahorcado. ¡Comienza a adivinar la palabra!")
    juegoAhorcado.inicializar()
    while (juegoAhorcado.intentosRestantes > 0) {
        juegoAhorcado.comprobarLetra()
    }
}