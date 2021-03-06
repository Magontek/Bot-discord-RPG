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

    //Este método seleccionaOpcion() toma un entero y devuelve el evento asignado a ese entero en el array Consecuencias.
    seleccionarOpcion(numero,personaje) // Para todos
    {
        if( numero>this.opciones(personaje).length ) return console.error('Opcion invalida') ;  // sin item 
        const siguienteEvento = this.consecuencias.at(numero)
        if(!siguienteEvento){
            console.log(`La opcion ${numero} es invalida`)
            return `La opcion ${numero} es invalida`
        }
        console.log(`Evento intenta pasar al evento: ${siguienteEvento.nombre}`)
        this.narrativa.pasarAEvento(siguienteEvento)
        return ``
    }
    //opciones(personaje) : array(str)toma un personaje y devuelve todas las posibles opciones para ese personaje en ese evento. 
    opciones(){ 
        return null 	  

    }
}