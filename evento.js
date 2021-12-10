module.exports = class Evento{
    constructor(){
        this.nombre = 'Evento1'
        this.narrativa = null
        this.enunciado = 'Este es un evento, wiii'
        this.efectoNecesario = null
        this.oculto =false
        this.consecuencias = [this,this,this,this]
    }
    selecionaOpcion(index){
        return this.consecuencias.at(index)
    }
    opciones(personaje){
        return ['Opcion1','Opcion2','Opcion3','Opcion4']
    }
}



