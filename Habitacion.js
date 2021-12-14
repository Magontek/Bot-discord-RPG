const Evento = require('./Evento.js')

//__________Habitacion______________________
  
module.exports = class Habitacion extends Evento
{
	constructor(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias)
	{ 
		super(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias)
	}
      
	opciones(personaje) 
	{ 
		return explorar(personaje).map( consecuencia => `${personaje.nombre} ve un/una ${consecuencia.nombre}` ) ;   
    }
    explorar(personaje) {  

      return this.consecuencias.filter( consecuencia => ( personaje.tieneEfecto(consecuencia.efectoNecesario) && consecuencia.oculto ) || !consecuencia.oculto)
    }
}
