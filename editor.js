const fs = require('fs');
const Personaje  = require ('./Personaje.js');
const ObjetoUsable = require ('./ObjetoUsable.js');    
const Efecto  = require ('./Efecto.js');
const Puerta = require ('./Puerta.js');
const Cofre  = require ('./Cofre.js');
const Enemigo = require ('./Enemigo.js');
const Habitacion  = require ('./Habitacion.js');
const Narrativa = require ('./Narrativa.js');
const ClaseDePersonaje = require('./ClaseDePersonaje.js')

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

    exportarNarrativa(){
        this.narrativa.foreach( elemento => {
            const eventoJSON = JSON.stringify(elemento)
            const dir = `./Historias/${narrativa.nombre}`
            this.exportar(dir,elemento.narrativa.nombre,eventoJSON)
        })
    }

    eportarEventos(){
        this.eventos.foreach( elemento => {
            const eventoJSON = JSON.stringify(elemento)
            const dir = `./Historias/${narrativa.nombre}/Eventos/${elemento.tipo}`
            this.exportar(dir,elemento.evento.nombre,eventoJSON)
        })
    }
    
    exportarObjetos(){ 
        this.objetos.foreach( elemento => {
            const eventoJSON = JSON.stringify(elemento)
            const dir = `./Historias/${narrativa.nombre}/Objetos/${elemento.nombre}`
            this.exportar(dir,elemento.objeto.nombre,eventoJSON)
        })
    }
    exportarEfectos(){
        this.efectos.foreach( elemento => {
            const eventoJSON = JSON.stringify(elemento)
            const dir = `./Historias/${narrativa.nombre}/Efectos/${elemento.nombre}`
            this.exportar(dir,elemento.efecto.nombre,eventoJSON)
        })
    }
    exportarEnemigos(){
        this.enemigos.foreach( elemento => {
            const eventoJSON = JSON.stringify(elemento)
            const dir = `./Historias/${narrativa.nombre}/Enemigos/${elemento.nombre}`
            this.exportar(dir,elemento.enemigo.nombre,eventoJSON)
        })
    }

    exportar(dir,nombre,objetoJSON){
        if (!fs.existsSync(dir)) { //se fija si existe direcctorio
            fs.mkdirSync(dir, {  //crea la carpeta del tipo de elemento de manera recursiva (si no existe x crea x) crea la carpeta dentro de la carpeta... 
                recursive: true
            });
        }

        fs.writeFile( `dir/${nombre}.JSON` , objetoJSON ,function(err){ //guarda el archivo
            if (err) return console.log(err)} )
    }

    exportarTodo(){
        this.exportarNarrativa()
        this.eportarEventos()
        this.exportarObjetos()
        this.exportarEfectos()
        this.exportarEnemigos()
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

    static makeDummy(){
        

        //Efectos de la historia //nombre id, si ataca nombre es ataque.
        var ataqueConEspada = new Efecto ("ataque", 205, 10)
        var atacarConEscudo = new Efecto("ataque", 201, 7)
        var defensaConEscudo = new Efecto("defensa", 210, 10)
        var ataqueConArmaMala = new Efecto("ataque", 202, 1)
        var percepcion = new Efecto("detectar", 200, 20)
        var abrirCerraduraPesada = new Efecto("abrirCerraduras", 240, 1)
        var locura = new Efecto("ataque", 230, 30)

        //Objetos de la historia
        //Objs que puede encontrar
        var escudo = new ObjetoUsable("Escudo debil", 12, [atacarConEscudo, defensaConEscudo], "Item", "Guerreo")
        var llave = new ObjetoUsable("Llave", 16, [abrirCerraduraPesada], "Item", "Cualquiera")

        //Obj de enemigos
        var espadaRota = new ObjetoUsable("Espada Rota", 14, [ataqueConArmaMala], "Item", "EnemigoDebil")
        var menteDeDios = new ObjetoUsable("Mente Divina", 17, [locura], "Poder", "EnemigoFuerte")

        //Personaje
        var enemigoDebil = new Personaje("Miedoso", 102, 1, [espadaRota], 1, [], 0, "Enemigo")
        var enemigoFuerte = new Personaje("Cthulhu", 103, 50, [], 0, [menteDeDios], 1, "Enemigo" )

        //Narrativas
        var narrativa1 = new Narrativa("Historia de un Gerrero", "Te encuentras al comienzo de la aventura", null)

        //Eventos. nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias
        var entrada = new Puerta("Puerta de madera", 0, narrativa1, "Vas a entrar a la mazmorra", [], false, [primerEnemigo], true, 0) //tiene que ser id = 0
        var primerEnemigo = new Enemigo("Aventurero Asustado", 1, narrativa1, "El asustadiso hombre te reta", [], false, [habitacionSombria, cofreOculto], enemigoDebil)
        var cofreOculto = new Cofre("Cofre escondido", 2, narrativa1, "Encuentras el tesoro del infeliz", [percepcion], true, habitacionSombria, true, 20, [llave])
        var habitacionSombria = new Habitacion("Habitacion de dos puertas", 3, narrativa1, "Despues de matar al infeliz estas en una habitacion misteriosa", [], false, [puertaHs1, puertaHs2])
        var puertaHs1 = new Puerta("Puerta de acero quebradizo", 4, narrativa1, "Puerta dañada", [ataqueConEspada], false, [enemigoFuerte], false, 6)
        var puertaHs2 = new Puerta("Puerta de acero reforzado", 5, narrativa1, "hay una puerta inrompible", [abrirCerraduraPesada], false, [cofreEscondido], false, 25)
        var enemigoFuerte = new Enemigo("Bicho recien despierto", 6, narrativa1, "Despertaste a un bicho malo malo", [], false, [], [enemigoFuerte])
        var cofreEscondido = new Cofre("Cofre detras de habitacion", 7, narrativa1, "Ves un lindo cofre", [], false, [puertaHs1], true, 60, [escudo])

        narrativa1.eventoActual = entrada

        this.narrativa = narrativa1
        this.clases = []
        return narrativa1
    }

    static getClasesDummy(){
        var percepcion = new Efecto("detectar", 200, 20)
        var ataqueConEspada = new Efecto ("ataque", 205, 10)
        var defensaConEspada = new Efecto("defensa", 201, 5)
        //Objs iniciales
        var espadaSimple = new ObjetoUsable("Espada corta", 11, [ataqueConEspada, defensaConEspada], "Item", "Guerrero")
        var observador = new ObjetoUsable("Observador", 15, [percepcion], "Poder", "Cualquiera")
        //Clase
        var gerrero = new ClaseDePersonaje('Guerrero',[espadaSimple],3,[observador],1)
        return [gerrero]
    }
}