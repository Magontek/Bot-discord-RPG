const Evento = require('Evento.js')
//_____________Biblioteca______________________

  
module.exports = class Biblioteca extends Evento
{    constructor(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias,trampa,contenido)
	{  
		super(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias)
		this.trampa=trampa;//entero
		this.contenido=contenido; // Objeto
  
	}
	//efecto necesario =["Ataque","desactivar Trampa ","detectarTrampas","defensa"]
	opciones()
	{
        var todasOpciones=["Buscar","Buscar Con ${objeto}","Tomar Libro Para Adquirir Poder","Tomar Libro Con ${objeto} Para Adquirir Poder"];

		var a = ''
		var b = ''

		if( personaje.tieneEfecto("ataque") !=null ) a=todasOpciones.at(1)
		if( personaje.tieneEfecto("desactivarTrampa")) b=todasOpciones.at(3)
		arrayOpciones.push(todasOpciones.at(0));      // ABRIR
		arrayOpciones.push(a);   			      // ABRIR CON
		arrayOpciones.push(todasOpciones.at(2));	  //DESTRUIR
		arrayOpciones.push(b);					  //DESTRUIR CON
		
		return arrayOpciones ;
	}
   
   revisar()
   {
	   	let strTrampas=["hay trampa/s","no hay trampas"]
		if( personaje.tieneEfecto("detectarTrampas")    )
		if(trampa>0)return this.strTrampas.at(0);
		else return  this.strTrampas.at(1);
   }
   
   tomarPoder(personaje)
   {
		if (trampa>0) personaje.tieneEfecto("defensa").potencia>this.trampa;
		else return true
   }
//Si el jugador intenta tomar el poder y la biblioteca tiene una trampa se compara el poder del primer item con defensa del jugador.
    tomarPoderCon(personaje)
   {
		if( personaje.tieneEfecto("desactivarTrampa"))return true;
		else if(personaje.tieneEfecto("defensa").potencia>this.trampa) return true;
		else return false;
   } 
} 

