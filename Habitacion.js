const Evento = require('./Evento.js')

//__________Habitacion______________________
  
module.exports = class Habitacion extends Evento
{     
	opciones(personaje) 
	{ 
		return this.explorar(personaje).map( consecuencia => `Ves un/una ${consecuencia.nombre}` ) ; 
    }
    explorar(personaje) {  
      	return this.consecuencias.filter( 
		  		consecuencia => { 
					if(consecuencia.efectoNecesario.length>0 && consecuencia.oculto){
						return consecuencia.efectoNecesario.some(efecto => personaje.tieneEfecto(efecto))
				  	}
					return !consecuencia.oculto
					})
    }
}
