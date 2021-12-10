const fs = require('fs');
const Personaje  = require ('./clasesRPG.js');
const ObjetoUsable = require ('./clasesRPG.js');    
const Efecto  = require ('./clasesRPG.js');
const Puerta = require ('./clasesRPG.js');
const Cofre  = require ('./clasesRPG.js');
const Enemigo = require ('./clasesRPG.js');
const Habitacion  = require ('./clasesRPG.js');
const Narrativa = require ('./clasesRPG.js');

class editor {
    constructor (narrativa, eventos, clases, enemigos, efectos, objetos) {
        this.narrativa = null
        this.eventos = []      //array
        this.clases = []       //array
        this.enemigos = []     //array
        this.efectos = []     //array
        this.objetos = []     //array
    }
    
    //creacion Narrativa
    crearNarrativa(nombre, enunciado, eventoActual) {
        let narrativaNueva = new Narrativa (nombre, enunciado, eventoActual)
        this.narrativa.push( narrativaNueva )
    }
    //Crea una narrativa nueva y lo asigna a la variable narrativa.
    

    //creacion de eventos
    crearPuerta(nombre, id, enunciado, efectoNecesario, oculto, conscecuencias, abierta, dureza ) {
        let puertaNueva = new Puerta (nombre, id, enunciado, efectoNecesario, oculto, conscecuencias, abierta, dureza)
        this.eventos.push(puertaNueva)
    }
    //Crea un evento(puerta), lo agrega a la lista de eventos y lo retorna.
    
    crearCofre( nombre, id, enunciado, efectoNecesario, oculto, conscecuencias, abierta, dureza, contenido ) {
        let cofreNuevo = new Cofre (nombre, id, enunciado, efectoNecesario, oculto, conscecuencias, abierta, dureza, contenido)
        this.eventos.push(cofreNuevo)
    }
    //Crea un evento(cofre), lo agrega a la lista de eventos y lo retorna.
    
    crearEvEnemigo( nombre, id, enunciado, efectoNecesario, oculto, conscecuencias, personaje ) {
        let evEnemigoNuevo = new Enemigo (nombre, id, enunciado, efectoNecesario, oculto, conscecuencias, personaje)
        this.eventos.push( evEnemigoNuevo )
    }  
    //Crea un evento(enemigo), lo agrega a la lista de eventos y lo retorna.
    
    crearHabitacion( nombre, id, enunciado, efectoNecesario, oculto, conscecuencias ) {
        let habitacionNueva = new Habitacion ( nombre, id, enunciado, efectoNecesario, oculto, conscecuencias )
        this.eventos.push( habitacionNueva )
    }

    devolverEventos() {
        return this.eventos
    }
    //Crea un evento(habitacion), lo agrega a la lista de eventos y lo retorna.
    

    //creacion de Objetos
    crearObjeto( nombre, id, efectos, tipo, clase ) {
        let objetoNuevo = new ObjetoUsable (nombre, id, efectos, tipo, clase)
        this.objetos.push( objetoNuevo )
    }
    //Crea un objeto Usable nuevo y lo asigna al array objetos.
    

    //creacion de efectos
    crearEfecto( nombre, potencia, cantidadDeUsos ) {
        let efectoNuevo = new Efecto (nombre, potencia, cantidadDeUsos)
        this.efectos.push( efectoNuevo )
    }

    crearEnemigo( nombre, id, experiencia, items, maxitems, poderes, maxpoderes, clase ) {
        let enemigoNuevo = new Personaje( nombre, id, experiencia, items, maxitems, poderes, maxpoderes, clase )
        this.enemigos.push( enemigoNuevo )
    }
    //Crea un efecto nuevo y lo agrega al array de efectos.

    //exportacion/importacion direccion = "./ "
    exportarTodo( unaDireccion ) {
        let listas = [this.narrativa, this.eventos, this.clases, this.enemigos, this.efectos, this.objetos]
        listas.forEach(exports)
    }
    //Exporta todos los arrays que contienen los elementos de la historia y los guarda en la dirección relativa
    
    importarTodo(direccion, nombreDeHistoria) {}
    //Carga todos los archivos de la dirección relativa que estén dentro de la historia con ese nombreDeHistoria en las propiedades del editor.
    
    
    getNarrativa() {
        return this.narrativa
    }
    //Retorna el objeto this.narrativa
}