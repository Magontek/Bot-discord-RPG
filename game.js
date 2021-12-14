const fs = require('fs');
const Personaje = require('./personaje.js')
const Narrativa = require('./Narrativa.js')
const Editor = require('./Editor.js')

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
    crearPartida(guildId,userId,nombreHistoria,personaje){
        const narrativa = Editor.makeDummy()
        if(!narrativa) return false;
        this.partidas.push({guildId: guildId, 
                            userId: userId, 
                            narrativa: narrativa, 
                            personaje: personaje
                            })
        return true
    };

    /*Lista todos los nombres de las carpetas dentro de la carpeta historias. 
    Y toma la descripcion del archivos narrativa.JSON*/
    listarHistorias(){
        return [{label:'Nombre1', description:'Descripcion1', value: '0',},
                {label:'Nombre2', descripcion:'Descripcion2', value: '1',},
                ];
    };

    cargarHistoria(nombre){
        const evento = new Evento()
        const narrativa = new Narrativa('Una Narrativa',evento,this.clasesDePersonaje(nombre))//Objeto narrativa
        evento.narrativa = narrativa
        return narrativa
    }

    /*Retorna el objeto narrativo que corresponde a ese user y guild.*/
    partidaDe(userId, guildId){
        const partida = this.partidas.filter(element => element.userId==userId && element.guildId==guildId);
        const nombre = partida.personaje.nombre
		console.log(`Partida: ${nombre}`)
        return partida
    };

    personajeDe(userId, guildId){
        return this.partidaDe(userId, guildId).personaje
    }

    crearPersonaje(nombre, nombreClase, historia){
        const claseDePersonaje = this.buscarClase(nombreClase, historia)
        if (!claseDePersonaje){
            console.error(`no existe la clase ${nombreClase}`)
            return null;
        }
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


    clasesDePersonaje(historia){
        return Editor.getClasesDummy()
        /*
        nombreDeClase : Str
        itemInicial : Arry(Obj(item))
        MaxItems : Int
        poderInicial : Array(Obj(Poder))
        MaxPoderes : Int
        */
    }

    getParcial(userId, guildId){
        let parcial = this.parciales.find(element => element.userID==userId && element.guildID == guildId)
        if (!parcial){
            parcial = ({userID : userId, 
                        guildID : guildId, 
                        nombrePersonaje : '', 
                        clasePersonaje : '', 
                        historia : ''
                    });
            this.parciales.push(parcial)
            console.log('Creando nuevo personaje parcial...')
        }
        return parcial
    }

    historiaParcial(nombreHistoria){
        this.getParcial(interaction.user.id, interaction.guild.id).nombreHistoria = nombreHistoria
    }

    claseParcial(clasePersonaje){
        this.getParcial(interaction.user.id, interaction.guild.id).clasePersonaje = clasePersonaje
    }


    nombreParcial(nombrePersonaje){
        this.getParcial(interaction.user.id, interaction.guild.id).nombrePersonaje = nombrePersonaje
    }

    
    parcialCompleto(userId, guildId){
        return (this.getParcial(userId, guildId).nombrePersonaje && 
                this.getParcial(userId, guildId).clasePersonaje && 
                this.getParcial(userId, guildId).nombreHistoria);
    }

    parcial2Personaje(userId, guildId){
        if(this.parcialCompleto(userId, guildId)){
            const parcial = this.getParcial(userId, guildId)
            const personaje = this.crearPersonaje(parcial.nombrePersonaje, parcial.clasePersonaje, parcial.nombreHistoria)

            return personaje
        }
        return 
    }

    eliminarPartida(userId, guildId){
        const index = this.indiceDePartidaDe(userId, guildId)
        this.eliminarPartidaIndice(index)
    }

    eliminarPartidaIndice(index){
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    indiceDePartidaDe(userId, guildId){
        return this.partidas.findIndex(element => element.userId==userId && element.guildId==guildId)
    }
};

//const game = new Game()
//console.log(game.buscarClase('clase', 'historia'))