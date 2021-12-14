
const Evento = require('./Evento.js')
//_______________________Puerta____________________


module.exports =class Puerta extends Evento
{
	/* contructor padre
	    this.nombre=nombre;
        this.mienunciado=mienunciado;
        this.oculto=oculto;
        this.consecuencias=consecuencias;
        this.id=id;
        this.narrativa=narrativa; */
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
    this.todasOpciones=["Abrir","Abrir Puerta Con ${objeto}","Destruir Puerta","Destruir Puerta Con ${objeto}"];

if (personaje.tieneEfecto("abrirCerradura") ||personaje.tieneEfecto(this.efectoNecesario)) 
this. a=todasOpciones.at(1);//abrirCon =>abrirCerradura --llave 
else this.a=null
if (personaje.tieneEfecto("ataque")!=null ) this.b=todasOpciones.at(3);//destruirCon=>ataque
else this.b=null
this.arrayOpciones.at(0)=todasOpciones.at(0);      // ABRIR 
this.arrayOpciones.at(1)=a;   			      // ABRIRCON 
this.arrayOpciones.at(2)=todasOpciones.at(2);	  //DESTRUIR
this.arrayOpciones.at(3)=b;					  //DESTRUIR CON
  
	 // Retorna opciones e indice de consecuencias

this.indiceConsecuencias=0;
arrayOpciones.forEach(arrayOpcion=>console.log(arrayOpcion));     
return this.todasOpciones;

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