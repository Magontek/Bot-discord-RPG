const fs = require('fs');
const Narrativa = require('./narrativa.js')
const Personaje = require('./personaje.js')

// Esta clase es la que se usa para interactuar con la narrativa. 
module.exports = class Game{
    constructor(){
        //Este es un array que contiene cuatro campos: 
        //guildID, user, Obj(Narrativa), personaje
        this.partidas=[];
        this.parciales=[];
    };
    /*Este método crea todos los objetos de la historia con ese nombre, se queda con el handler
    del objeto narrativa y lo almacena en un nuevo elemento del array partidas junto con el user 
    y guild que devuelve discord.js y el personaje.
    Solo puede haber una partida para cada par user guild.*/
    crearNarrativa(guildId,userId,nombreHistoria,personaje){
        const narrativa = this.cargarHistoria(nombreHistoria)
        this.partidas.push([ guildId , userId , narrativa, personaje])
        return narrativa
    };
    /*Lista todos los nombres de las carpetas dentro de la carpeta historias. 
    Y toma la descripcion del archivos narrativa.JSON*/
    listarHistorias(){
        return [{label:'Nombre1', description:'Descripcion1', value: '0',},
                {label:'Nombre2', descripcion:'Descripcion2', value: '1',},
                ];
    };

    cargarHistoria(nombre){
        return //Objeto narrativa
    }

    /*Retorna el objeto narrativo que corresponde a ese user y guild.*/
    partidaDe(userId, guildId){
        return this.partidas.filter(element => element.userId==userId && element.guildId==guildId);
    };

    personajeDe(userId, guildId){
        return this.partidaDe(userId, guildId).personaje
    }

    crearPersonaje(nombre, nombreClase, historia){
        const claseDePersonaje = this.buscarClase(nombreClase, historia)
        if (!claseDePersonaje) return console.error(`no existe la clase ${nombreClase}`);
        return new Personaje(nombre, 
                            claseDePersonaje.itemInicial, 
                            claseDePersonaje.maxItems, 
                            claseDePersonaje.poderInicial, 
                            claseDePersonaje.maxPoderes, 
                            claseDePersonaje.nombre
                            );
    }

    buscarClase(nombreClase, historia){
        return this.clasesDePersonaje(historia).find(element => element.nombre == nombreClase)
    }

    /*
        nombreDeClase : Str
        itemInicial : Arry(Obj(item))
        MaxItems : Int
        poderInicial : Array(Obj(Poder))
        MaxPoderes : Int
    */
    clasesDePersonaje(historia){
        return [{ //maqueta
                nombre: 'clase',
                itemInicial: [], 
                maxItems: 2, 
                poderInicial: [], 
                maxPoderes: 2, 
                }]
    }

    getParcial(userId, guildId){
        let parcial = this.parciales.find(element => element.userID==userId && element.guildID == guildId)
        if (!parcial){
            parcial = ({userID : userId, 
                        guildID : guildId, 
                        nombrePersonaje : '', 
                        clasePersonaje : '', 
                        nombreHistoria : ''});
            this.parciales.push(parcial)
            console.log('Creando nuevo personaje parcial...')
        }
        return parcial
    }

    parcialCompleto(userId, guildId){
        return (this.getParcial(userId, guildId).nombrePersonaje && 
                this.getParcial(userId, guildId).clasePersonaje && 
                this.getParcial(userId, guildId).nombreHistoria);
    }
};

//const game = new Game()
//console.log(game.buscarClase('clase', 'historia'))