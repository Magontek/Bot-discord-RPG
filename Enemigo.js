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
	{// [muerto, enemigoHuye, personajeHuye, personajeHuyeUsando]
		var todasOpciones=["Atacar","Atacar Con ${objeto}","Huir con ${objeto}","Huir Usando ${objeto}"];

		var a = ''
		var b = ''

		if (personaje.tieneEfecto("ataque").length>0 ) a=todasOpciones.at(1) + personaje.tieneEfecto("ataque").at(0) ;    //atacarCon => ataque
		if (personaje.tieneEfecto("sigilo").length>0){
			a=todasOpciones.at(3) + personaje.tieneEfecto("sigilo").at(0);
		}
		if (personaje.tieneEfecto(this.efectoNecesario).length>0){
			a=todasOpciones.at(3) + personaje.tieneEfecto(this.efectoNecesario).at(0);//abrirCon =>abrirCerradura --llave 
		}

		var arrayOpciones = []

		arrayOpciones.push(todasOpciones.at(0))		// atacar
		arrayOpciones.push(a)			           	// atacar con
		arrayOpciones.push(todasOpciones.at(2))	   	// huir
		arrayOpciones.push(b)					   	// huir con

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