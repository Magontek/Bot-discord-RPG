const Evento = require('./Evento.js')

//__________Habitacion______________________
  
module.exports = class Habitacion extends Evento
{
	constructor(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias)
	{ 
		super(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias)
	}
      
	opciones() 
	{ 
       
return this.consecuencias ;   

    }
    explorar(personaje) {  

      return this.consecuencias.filter( consecuencia=>( personaje.tieneEfecto(consecuencia.efectoNecesario) &&consecuencia.oculto ) ||!consecuencia.oculto)
        }


}
