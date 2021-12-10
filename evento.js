class Evento{
    constructor(nombre,narativa){
        this.nombre = 'Evento1'
        this.narrativa = narrativa
        this.enunciado = 'Este es un evento, wiii'
        this.efectoNecesario = null
        this.oculto =false
        this.consecuencias = [self,self,self,self]
    }
    selecionaOpcion(index){
        return this.consecuencias.at(index)
    }
    opciones(personaje){
        return ['Opcion1','Opcion2','Opcion3','Opcion4']
    }
}



