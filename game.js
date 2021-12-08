const fs = require('fs');
const Narrativa = require('./narrativa.js')
const Personaje = require('./personaje.js')

// Esta clase es la que se usa para interactuar con la narrativa. 
module.exports = class Game{
    constructor(){
        //Este es un array que contiene cuatro campos: 
        //guildID, user, Obj(Narrativa), personaje
        this.partidas=[];

    };
    /*Este método crea todos los objetos de la historia con ese nombre, se queda con el handler
    del objeto narrativa y lo almacena en un nuevo elemento del array partidas junto con el user 
    y guild que devuelve discord.js y el personaje.
    Solo puede haber una partida para cada par user guild.*/
    crearNarrativa(guild,userID,nombreHistoria,personaje){
        const narrativa = cargarHistoria(nombreHistoria)
        this.partidas.push([ guild , userID , narrativa, personaje])
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
    partidaDe(user, guild){
        return this.partidas.filter(element => element.user.id==user.id && element.guild.id==guild.id);
    };

    crearPersonaje(nombre, clase, historia){
        const claseDePersonaje = this.clasesDePersonaje(historia).find(clase)
        if (!claseDePersonaje) console.error("no existe la clase");
        return new Personaje(nombre, 
                            clasesDePersonaje.items, 
                            clasesDePersonaje.maxItems, 
                            clasesDePersonaje.poderes, 
                            clasesDePersonaje.maxPoderes, 
                            clase
                            );
    }

    clasesDePersonaje(historia){
        return 
    }
};