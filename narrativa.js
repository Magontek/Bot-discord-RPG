//Esta clase es la interfaz de los eventos. Siempre apunta al evento actual y va actualizando ese evento en función de las opciones elegidas.
module.exports = class Narrativa{
    constructor(enunciado,eventoActual,clasesDePersonaje){
        this.enunciado = enunciado
        this.eventoActual = eventoActual
    }
    //Llama a eventoActual.SelecionarOpcion(int) y retorna el resultado.
    SelecionarOpcion(int){
        return 'Resultado de elegir opcion'
    }
    //Retorna eventoActual.enunciado
    describirEvento(){
        return 'Descripcion del evento'
    }
    //Llama a eventoActual.imprimirOpciones(personaje) y retorna el resultado
    ImprimirOpciones(personaje){
        return ['Opcion1','Opcion2']
    }
}