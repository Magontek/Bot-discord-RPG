

//__________Habitacion______________________
  
module.export = class Habitacion extends Evento
{     constructor(nombre,mienunciado,oculto,id,contenido,narrativa,consecuencias,efectoNecesario)
	{ this.efectoNecesario=efectoNecesario;
	  this.nombre=nombre;
	  this.mienunciado=mienunciado;
	  this.oculto=oculto;
	  this.id=id;
	  this.contenido=contenido; // Objeto
	  this.consecuencias=consecuencias;
      this.narrativa=narrativa;
	}	//efectoNecesario=["descubrirOculto"]
      
	opciones() 
	{ 
       
return this.consecuencias ;   

    }
    explorar(personaje) {  

      return this.consecuencias.filter( consecuencia=>( personaje.tieneEfecto(consecuencia.efectoNecesario) &&consecuencia.oculto ) ||!consecuencia.oculto)
        }


}
