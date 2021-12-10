//Esta clase es la interfaz de los eventos. Siempre apunta al evento actual y va actualizando ese evento en función de las opciones elegidas.
module.exports = class Narrativa{
    constructor(nombre,enunciado,eventoActual){
        this.enunciado = enunciado
        this.eventoActual = eventoActual
    }
    //Llama a eventoActual.SelecionarOpcion(int) y retorna el resultado.
    selecionarOpcion(index){
        this.eventoActual = this.eventoActual.selecionaOpcion(index)
        return;
    }
    //Retorna eventoActual.enunciado
    describirEvento(personaje){
        return this.eventoActual.enunciado
    }
    //Llama a eventoActual.imprimirOpciones(personaje) y retorna el resultado
    imprimirOpciones(personaje){
        return this.eventoActual.opciones(personaje)
    }
}