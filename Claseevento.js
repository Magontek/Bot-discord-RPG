class Evento{
    //________________CONSTRUCTORES____________________
constructor(nombre,mienunciado,oculto,consecuencias,id,narrativa){
    this.nombre=nombre;
    this.mienunciado=mienunciado;
    this.oculto=oculto;
    this.consecuencias=consecuencias;
    this.id=id;
    this.narrativa=narrativa;
};
opciones(){ 
return null 	  
//opciones(personaje) : array(str)toma un personaje y devuelve todas las posibles opciones para ese personaje en ese evento. 
}
seleccionaOpcion(numero) // Para todos
{
     if(numero<opciones.length )  console.er ;  // sin item 
    return this.consecuencias.at(opciones(numero));			    
//Este método seleccionaOpcion() toma un entero y devuelve el evento asignado a ese entero en el array Consecuencias.
}					   			                        

}