module.exports = class Evento{
    //________________CONSTRUCTORES____________________
    constructor(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias){
        this.nombre=nombre;
        this.id=id;
        this.narrativa=narrativa;
        this.enunciado=enunciado;
        this.efectoNecesario=efectoNecesario;
        this.oculto=oculto;
        this.consecuencias=consecuencias;
    };
    //opciones(personaje) : array(str)toma un personaje y devuelve todas las posibles opciones para ese personaje en ese evento. 
    opciones(){ 
        return null 	  

    }
    //Este método seleccionaOpcion() toma un entero y devuelve el evento asignado a ese entero en el array Consecuencias.
    seleccionaOpcion(numero) // Para todos
    {
        if( numero<opciones.length )  console.error('Opcion invalida') ;  // sin item 
        this.narrativa.pasarAEvento(evento)
        return this.consecuencias.at(this.opciones(numero));
    }
}