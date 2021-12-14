const fs = require('fs');
const Personaje  = require ('./clasesRPG.js');
const ObjetoUsable = require ('./clasesRPG.js');    
const Efecto  = require ('./clasesRPG.js');
const Puerta = require ('./clasesRPG.js');
const Cofre  = require ('./clasesRPG.js');
const Enemigo = require ('./clasesRPG.js');
const Habitacion  = require ('./clasesRPG.js');
const Narrativa = require ('./clasesRPG.js');

module.exports = class Editor {
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
    
    importarTodo(direccion, nombreDeHistoria) {

    }
    //Carga todos los archivos de la dirección relativa que estén dentro de la historia con ese nombreDeHistoria en las propiedades del editor.
    
    importarClases(){
        return null
    }

    importarNombresDeHistorias(){
        return null
    }
    
    getNarrativa() {
        return this.narrativa
    }

    makeDummy(){
        //Efectos de la historia //nombre id, si ataca nombre es ataque.
        var ataqueConEspada = new Efecto ("ataque", 5, 10)
        var defensaConEspada = new Efecto("Defenderse con espada", 1, 5)
        var atacarConEscudo = new Efecto("Atacar con el Escudo", 1, 7)
        var defensaConEscudo = new Efecto("Defenderse con Escudo", 10, 10)
        var resistencia = new Efecto("Usar Resistencia Corporal", 3, 100)
        var ataqueConArmaMala = new Efecto("Ataque debil", 2, 1)
        var percepcion = new Efecto("Estas atento", 0, 20)
        var abrirCerraduraPesada = new Efecto("Abriste la cerradura", 0, 1)
        var locura = new Efecto("Causar locura", 30, 30)

        //Objetos de la historia
        //Objs iniciales
        var espadaSimple = new ObjetoUsable("Espada corta", 11, [ataqueConEspada, defensaConEspada], "Item", "Guerrero")
        var escudoSimple = new ObjetoUsable("Cuerpo trabajadp", 13, [resistencia], "Poder", "Guerrero")  
        var observador = new ObjetoUsable("Observador", 15, percepcion, "Poder", "Cualquiera")

        //Objs que puede encontrar
        var escudo = new ObjetoUsable("Escudo debil", 12, [atacarConEscudo, defensaConEscudo], "Item", "Guerreo")
        var llave = new ObjetoUsable("Llave", 16, abrirCerraduraPesada, "Item", "Cualquiera")

        //Obj de enemigos
        var espadaRota = new ObjetoUsable("Espada Rota", 14, ataqueConArmaMala, "Item", "EnemigoDebil")
        var menteDeDios = new ObjetoUsable("Mente Divina", 17, locura, "Poder", "EnemigoFuerte")

        //Personaje
        var enemigoDebil = new Personaje("Miedoso", 102, 1, [espadaRota], 1, [], 0, "Enemigo")
        var enemigoFuerte = new Personaje("Cthulhu", 103, 50, [], 0, [menteDeDios], 1, "Enemigo" )

        //Eventos. (Leer la descripcion)
        var entrada = new Puerta("Puerta de madera", 201,  "Vas a entrar a la mazmorra", null, false, [primerEnemigo], true, 0) //tiene que ser id = 0
        var primerEnemigo = new Enemigo("Aventurero Asustado", 202, "El asustadiso hombre te reta", null, false, [habitacionSombria, cofreOculto], enemigoDebil)
        var cofreOculto = new Cofre("Cofre escondido", 203,  "Encuentras el tesoro del infeliz", [percepcion], true, habitacionSombria, true, 20, [llave])
        var habitacionSombria = new Habitacion("Habitacion de dos puertas", 203,  "Despues de matar al infeliz estas en una habitacion misteriorsa", [], false, [puertaHs1, puertaHs2])
        var puertaHs1 = new Puerta("Puerta de acero quebradizo", 205,  "Puerta dañada", [ataqueConEspada], false, enemigoFuerte, false, 6)
        var puertaHs2 = new Puerta("Puerta de acero reforzado", 206,  "hay una puerta inrompible", [abrirCerraduraPesada], false, cofreEscondido, false, 25)
        var enemigoFuerte = new Enemigo("Bicho recien despierto", 207,  "Despertaste a un bicho malo malo", [], false, [], enemigoFuerte)
        var cofreEscondido = new Cofre("Cofre detras de habitacion", 208,  "Ves un lindo cofre", [], false, puertaHs1, true, 60, [escudo])

        //Narrativas
        this.narrativa = new Narrativa("Te encuentras al comienzo de la aventura", entrada)
        return this.narrativa
    }
}