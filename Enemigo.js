const Evento = require('./Evento.js')
module.exports = class Enemigo extends Evento
{ 
	constructor(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias,personaje)
	{   
		super(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias)
		this.personaje=personaje;
	}

  // Consecuencias responde en el orden:[muerto, enemigoHuye, personajeHuye, personajeHuyeUsando]

  opciones(personaje) 
	{this.todasOpciones=["Atacar","Atacar Con ${objeto}","Huir con ${objeto}","Huir Usando ${objeto}"];
	if (personaje.tieneEfecto("ataque")!=null ) this.a=ArrayOpciones.at(1);    //atacarCon => ataque
	else this.a=null;
	if ( (personaje.tieneEfecto("sigilo")) || (personaje.tieneEfecto("velocidad" ) ) )  this.b=todasOpciones.at(3) //huirCon ==> sigilo o velocidad
	else this.b=null;
	
    this.arrayOpciones.at(0)=todasOpciones.at(0);      // atacar
	this.arrayOpciones.at(1)=a;   			           // atacar con
	this.arrayOpciones.at(2)=todasOpciones.at(2);	   // huir
	this.arrayOpciones.at(3)=b;					       // huir con

    this.indiceConsecuencias=0;
    // [muerto, enemigoHuye, personajeHuye, personajeHuyeUsando]

   return arrayOpciones ;
   
    
	}

	defenderDe(personaje)				
	{ return personaje.getNivel() > (this.getNivel()+this.tieneEfecto("defensa").at(0).potencia );
	}
	defenderDeItem(personaje,objetoUsable)
	{return (personaje.getNivel()+objetoUsable.contieneEfecto("ataque").potencia )> (this.getNivel() + this.tieneEfecto("defensa").at(0).potencia );
	}

	venceA(personaje,objetoUsable)
	{return ( personaje.getNivel()+objetoUsable.contieneEfecto("defensa").potencia)<(this.getNivel()+this.tieneEfecto("ataque").potencia);
	}
	tieneArma()
	{
    return personaje.arma.tieneEfecto("ataque") ;
	}
	ganaCombate()
	{ 
		return (this.defenderDe(personaje)&&this.venceA(personaje))
	}

}