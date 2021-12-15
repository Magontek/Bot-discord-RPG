
const Evento = require('./Evento.js')
//_______________________Puerta____________________


module.exports =class Puerta extends Evento
{
    constructor(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias,abierto,dureza)
{
	/*Consecuencias responde en el orden [abrir,abrircon,destruir,destruircon]*/
	super(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias)
    this.abierto=abierto;//booleano
    this.dureza=dureza;	//entero    
}
//opciones(personaje) : array(str)toma un personaje y devuelve todas las posibles opciones para ese personaje en ese evento. 
opciones(personaje) 
{
    var todasOpciones=["Abrir","Abrir Puerta Con","Destruir Puerta","Destruir Puerta Con"];

    var a = ''
    var b = ''

    if (personaje.tieneEfecto("abrirCerradura").length>0){
        a=todasOpciones.at(1) + personaje.tieneEfecto("abrirCerradura").at(0);
    }
    if (personaje.tieneEfecto(this.efectoNecesario).length>0){
        a=todasOpciones.at(1) + personaje.tieneEfecto(this.efectoNecesario).at(0);//abrirCon =>abrirCerradura --llave 
    }
    if (personaje.tieneEfecto("ataque")!=[] ) b=todasOpciones.at(3) + personaje.tieneEfecto("ataque").at(0);//destruirCon=>ataque

    var arrayOpciones = []
    arrayOpciones.push(todasOpciones.at(0));      // ABRIR 
    arrayOpciones.push(a);   			      // ABRIRCON 
    arrayOpciones.push(todasOpciones.at(2));	  //DESTRUIR
    arrayOpciones.push(b);					  //DESTRUIR CON
    
        // Retorna opciones e indice de consecuencias

    //arrayOpciones.forEach(arrayOpcion=>console.log(arrayOpcion)); 

    return arrayOpciones

}

defenderDe(personaje)				
{ return personaje.getNivel()>this.dureza;
} //Este método recibe un personaje y devuelve True si el nivel del personaje supera la dureza de la puerta.

defenderDeItem(personaje)
{
return (personaje.getNivel()+(this.personaje.tieneEfecto("ataque").at(0)).potencia)>this.dureza;    //ataque
//Este método recibe un personaje y un ítem y devuelve True si el nivel del personaje más el valor de potencia del efecto ataque del ítem supera la dureza de la puerta.
}
abrir(){
	return abierto
}
abrirCon(personaje)
{
    if( (personaje.tieneEfecto("abrirCerradura")!=null ) || (personaje.tieneEfecto(this.efectoNecesario)!=null ) ) 
	return abierta=true;
	else return null
}

}