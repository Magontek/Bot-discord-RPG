module.export = class Evento{
    //________________CONSTRUCTORES____________________
    constructor(nombre,mienunciado,oculto,consecuencias,id,narrativa){
        this.nombre=nombre;
        this.mienunciado=mienunciado;
        this.oculto=oculto;
        this.consecuencias=consecuencias;
        this.id=id;
        this.narrativa=narrativa;
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
        return this.consecuencias.at(opciones(numero));
    }
}