const juegoAhorcado = {
    palabras: ["rulo", "diecinueve", "ahorcado", "ganar", "perro", "gato", "dificil", "juego"], // posibles palabras
    palabraSeleccionada: "",
    letrasUtilizadas: [],
    intentosRestantes: 5,
    inicializar() {
        console.log("El juego ha iniciado")
        this.palabraSeleccionada = this.palabras[Math.floor(Math.random() * this.palabras.length)]
        this.mostrarPalabra()
    },

    mostrarPalabra() {
        const palabraMostrada = this.palabraSeleccionada.split('').map(char => { //con split divido la palabra y con map trasforomo cada caracter y por ultimo con join uno todo
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
        
        // Si hay mas de una letra, se sigue pidiendo una entrada
        while (letra.length !== 1) {
            letra = prompt("Introduce una letra:").toLowerCase()
    
            // si se canceló el prompt o se cerro, se termina.
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
    
        this.letrasUtilizadas.push(letra) // para llevar un registro de las letras que se han intentado
    
        if (!this.palabraSeleccionada.includes(letra)) {
            this.intentosRestantes-- // se reduce en 1 los intentos 
            alert("Incorrecto, " + letra + " no está en la palabra.")
            alert("Letras utilizadas: " + this.letrasUtilizadas.join(", ") + "\nIntentos restantes: " + this.intentosRestantes)
            
            if (this.intentosRestantes === 0) { //si se llega a 0 intentos se reinicia 
                alert("Perdiste! La palabra era: " + this.palabraSeleccionada)
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

// es un mensaje de bienvenida cuando cargue la pagina
window.onload = () => {
    alert("Bienvenido al juego del ahorcado. Adivina la palabra!")
    juegoAhorcado.inicializar()
    while (juegoAhorcado.intentosRestantes > 0) {
        juegoAhorcado.comprobarLetra()
    }
}