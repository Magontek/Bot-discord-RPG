module.exports = class Narrativa
{
	constructor(nombre,enunciado,eventoActual)
	{   this.nombre=nombre;
		this.enunciado=enunciado;
		this.eventoActual=eventoActual;
	}
    	//SelecionarOpcion(int) : str Llama a eventoActual.SelecionarOpcion(int) y retorna el resultado.
	seleccionarOpcion(entero,personaje){
		return this.eventoActual.seleccionarOpcion(entero,personaje)
	}

    	//describirEvento() : str Retorna eventoActual.enunciado
	describirEvento(){return this.eventoActual.enunciado}

	//ImprimirOpciones(personaje) : array(str) Llama a eventoActual.opciones(personaje) y retorna el resultado
	imprimirOpciones(personaje){
		console.log(`Opciones de evento: ${this.eventoActual.opciones(personaje)}`)
        return this.eventoActual.opciones(personaje)
    }

	pasarAEvento(evento){
		this.eventoActual = evento
	}
}
