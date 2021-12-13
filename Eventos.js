
module.export = class Narrativa
{
	constructor(nombre,enunciado,eventoActual)
	{   this.nombre=nombre;
		this.enunciado=enunciado;
		this.eventoActual=eventoActual;
	}
    	//SelecionarOpcion(int) : str Llama a eventoActual.SelecionarOpcion(int) y retorna el resultado.
	seleccionarOpcion(entero){
		return this.eventoActual.seleccionarOpcion(entero)
	}

    	//describirEvento() : str Retorna eventoActual.enunciado
	describirEvento(){return this.eventoActual.enunciado}

	//ImprimirOpciones(personaje) : array(str) Llama a eventoActual.opciones(personaje) y retorna el resultado
	imprimirOpciones(personaje){
        this.eventoActual.opciones(personaje)
    }
}

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


//_______________________Puerta____________________


module.export =class Puerta extends Evento
{
constructor(nombre,mienunciado,oculto,abierto,narrativa,dureza,consecuencias,id,efectoNecesario)
{
	this.nombre=nombre;
	this.mienunciado=mienunciado;
	this.oculto=oculto;
	this.id=id;
    this.abierto=abierto;//booleano
    this.dureza=dureza;	//entero
    this.consecuencias=consecuencias;/*Consecuencias responde en el orden [abrir,abrircon,destruir,destruircon]*/
	this.efectoNecesario=efectoNecesario; //ejemplo: Llave de oro -->efecto Llave de oro 
    this.narrativa=narrativa;
}
//opciones(personaje) : array(str)toma un personaje y devuelve todas las posibles opciones para ese personaje en ese evento. 
opciones(personaje) 
{
let todasOpciones=["abrir","abrirCon","destruir","destruirCon"];

if (personaje.tieneEfecto(abrirCerradura) ||personaje.tieneEfecto(this.efectoNecesario)) 
var a=todasOpciones.at(1);//abrirCon =>abrirCerradura --llave 
else a=null
if (personaje.tieneEfecto(ataque)!=null ) var b=todasOpciones.at(3);//destruirCon=>ataque
else a=null
this.arrayOpciones.at(0)=todasOpciones.at(0);      // ABRIR 
this.arrayOpciones.at(1)=a;   			      // ABRIRCON 
this.arrayOpciones.at(2)=todasOpciones.at(2);	  //DESTRUIR
this.arrayOpciones.at(3)=b;					  //DESTRUIR CON
  
	 // Retorna opciones e indice de consecuencias

this.indiceConsecuencias=0;
arrayOpciones.forEach(arrayOpcion=>console.log(arrayOpcion));     
return this.indiceConsecuencias;

}

defenderDe(personaje)				
{ return personaje.getNivel()>this.dureza;
} //Este método recibe un personaje y devuelve True si el nivel del personaje supera la dureza de la puerta.

defenderDeItem(personaje)
{
return (personaje.getNivel()+(this.personaje.tieneEfecto(ataque).at(0)).potencia)>this.dureza;    //ataque
//Este método recibe un personaje y un ítem y devuelve True si el nivel del personaje más el valor de potencia del efecto ataque del ítem supera la dureza de la puerta.
}
abrir(){
	return abierto
}
abrirCon(personaje)
{
    if( (personaje.tieneEfecto(abrirCerradura)!=null ) || (personaje.tieneEfecto(this.efectoNecesario)!=null ) ) 
	return abierta=true;
	else return null
}

}

//_____________COFRE______________________

module.export = class Cofre extends Evento                            // ---------------Hereda de Puerta ,no de evento !!
{ constructor(nombre,mienunciado,oculto,id,abierto,narrativa,dureza,contenido,consecuencias,efectoNecesario)         
  { this.nombre=nombre;
	this.mienunciado=mienunciado;
	this.oculto=oculto;
	this.id=id;
	this.abierto=abierto;//bool
	this.dureza=dureza; // entero
	this.contenido=contenido; // Objeto
	this.consecuencias=consecuencias;
	this.efectoNecesario=efectoNecesario;  // ej : LLaveDePlata--->efecto:LLaveDePlata_001;
    this.narrativa=narrativa;
  }
  opciones(personaje)
  {  let todasOpciones=[abrir,abrirCon,destruir,destruirCon];
	
  
  if (personaje.tieneEfecto(abrirCerradura)=!null ||personaje.tieneEfecto(this.efectoNecesario)) var a=todasOpciones.at(1) //abrirCon =>abrirCerradura
  else a=null
  if (personaje.tieneEfecto(ataque)!=null) var b=todasOpciones.at(3) //destruirCon=>ataque
  else b=null
  this.arrayOpciones.at(0)=opciones.at(0);      // ABRIR
  this.arrayOpciones.at(1)=a;   			   // ABRIR CON
  this.arrayOpciones.at(2)=opciones.at(2);	  //DESTRUIR
  this.arrayOpciones.at(3)=b;				  //DESTRUIR CON

  this.indiceConsecuencias=0;
  arrayOpciones.forEach(arrayOpcion=>console.log(arrayOpcion));     
  return this.indiceConsecuencias;
  
  }
  
  
	abrir(personaje){
		if(abierto)
		{return this.tomarItem(personaje); // abrir agarra item	
		}else return false
}
  abrirCon(personaje)
{
    if( personaje.tieneEfecto(abrirCerradura)!=null || personaje.tieneEfecto(this.efectoNecesario)!=null )// abrir con llave/abrirCerradura agarra item
	 {abierto=true;
	return this.tomarItem(personaje);
	}else return false
}


  tomarItem(personaje)
  {   if( !personaje.agregarItem(contenido))contenido=null;           // Agrega el item del cofre a la lista de ítems ,si el personaje está usando contenido=null-------------------------
 return  personaje.agregarItem(contenido); 
  }


  defenderDe(personaje)
  { 
	  if(personaje.getNivel()>this.dureza) return true;
	  else  var random=Math.random() ;      // math.random genera un numero pseudo aleatorio rango [0, 1)
	  if(random<=0.5)contenido=null;
 
	return false
	 }
  
  defenderDeItem(personaje)
  {if((personaje.getNivel()+personaje.tieneEfecto(ataque).potencia  )>this.dureza)return true;
  else 	var random=Math.random()        // math.random genera un numero pseudo aleatorio rango [0, 1)
  if(random<=0.5)contenido=null
  return false;
  }

}


//_____________Biblioteca______________________

  
module.export = class Biblioteca extends Evento
{    constructor(nombre,mienunciado,oculto,id,abierto,narrativa,dureza,contenido,trampa,consecuencias)
	{  this.narrativa=narrativa;
	  this.nombre=nombre;
	  this.mienunciado=mienunciado;
	  this.oculto=oculto;
      this.id=id;
	  this.abierto=abierto;//bool
	  this.dureza=dureza; // entero
	  this.contenido=contenido; // Objeto
	  this.consecuencias=consecuencias;
	  this.trampa=trampa;//entero
  
	}
	//efecto necesario =["Ataque","desactivar Trampa ","detectarTrampas","defensa"]
	opciones()
	{
    let todasOpciones=[Buscar,BuscarCon,TomarLibroParaAdquirirPoder,TomarLibroConParaAdquirirPoder];



	if( personaje.tieneEfecto(ataque) !=null )var a=todasOpciones.at(1)
	else let a=null
	if( personaje.tieneEfecto(desactivarTrampa)) var b=todasOpciones.at(3)
	else let b=null
	this.arrayOpciones.at(0)=todasOpciones.at(0);      // ABRIR
	this.arrayOpciones.at(1)=a;   			      // ABRIR CON
	this.arrayOpciones.at(2)=todasOpciones.at(2);	  //DESTRUIR
	this.arrayOpciones.at(3)=b;					  //DESTRUIR CON
		
this.indiceConsecuencias=0;
arrayOpciones.forEach(arrayOpcion=>console.log(arrayOpcion));     
return this.indiceConsecuencias;

	}
   
   revisar()
   {let strTrampas=["hay trampa/s","no hay trampas"]
    if( personaje.tieneEfecto(detectarTrampas)    )
	if(trampa>0)return this.strTrampas.at(0);
	else return  this.strTrampas.at(1);
   }
   
   tomarPoder(personaje)
   {if (trampa>0) personaje.tieneEfecto(defensa).potencia>this.trampa;
	else return true
   }
//Si el jugador intenta tomar el poder y la biblioteca tiene una trampa se compara el poder del primer item con defensa del jugador.


    tomarPoderCon(personaje)
   {
	if( personaje.tieneEfecto(desactivarTrampa))return true;
	else if(personaje.tieneEfecto(defensa).potencia>this.trampa) return true;
	else return false;
   } 
} 


//_____________Enemigo______________________

module.export = class Enemigo extends Evento
{ 
	constructor(nombre,mienunciado,oculto,id,arma,dureza,personaje,narrativa)
	{   this.nombre=nombre;
		this.mienunciado=mienunciado;
		this.oculto=oculto;
		this.id=id;
		this.dureza=dureza;
		this.arma=arma;
		this.personaje=personaje;
        this.narrativa=narrativa;
	}

  // Consecuencias responde en el orden:[muerto, enemigoHuye, personajeHuye, personajeHuyeUsando]

  opciones(personaje) 
	{let todasOpciones=[atacar,atacarCon,huir,huircon];
	if (personaje.tieneEfecto(ataque)!=null ) this.a=ArrayOpciones.at(1);    //atacarCon => ataque
	else let a=null;
	if ( (personaje.tieneEfecto(sigilo)) || (personaje.tieneEfecto(velocidad ) ) )  this.b=todasOpciones.at(3) //huirCon ==> sigilo o velocidad
	else let b=null;
	this.arrayOpciones.at(0)=todasOpciones.at(0);      // atacar
	this.arrayOpciones.at(1)=a;   			           // atacar con
	this.arrayOpciones.at(2)=todasOpciones.at(2);	   // huir
	this.arrayOpciones.at(3)=b;					       // huir con

    this.indiceConsecuencias=0;
    arrayOpciones.forEach(arrayOpcion=>console.log(arrayOpcion));     
    return this.indiceConsecuencias;
    
	}

	defenderDe(personaje)				
	{ return personaje.getNivel() > this.dureza+this.tieneEfecto(defender).at(0);
	}
	defenderDeItem(personaje,objetoUsable)
	{return (personaje.getNivel()+objetoUsable.contieneEfecto(ataque).potencia )> (this.dureza+this.tieneEfecto(defesa).at(0).potencia );
	}

	venceA(personaje,objetoUsable)
	{return ( this.getNivel()+personaje.tieneEfecto(ataque).at(0).potencia>this.getNivel()+this.arma.contieneEfecto(ataque).potencia)
	}
	tieneArma()
	{
    return this.arma.tieneEfecto(ataque) ;
	}
	ganaCombate()
	{ 
		return (defenderDe(personaje)&&this.venceA(personaje))
	}

}


//__________Habitacion______________________
  
module.export = class Habitacion extends Evento
{     constructor(nombre,mienunciado,oculto,id,contenido,narrativa,consecuencias,efectoNecesario)
	{ this.efectoNecesario=efectoNecesario;
	  this.nombre=nombre;
	  this.mienunciado=mienunciado;
	  this.oculto=oculto;
	  this.id=id;
	  this.abierta=abierta;//bool
	  this.dureza=dureza; // entero
	  this.contenido=contenido; // Objeto
	  this.consecuencias=consecuencias;
	  this.trampa=trampa;//entero
      this.narrativa=narrativa;
  
	}	//efectoNecesario=[descubrirOculto]
        // consecuencias[]
	opciones() 
	{  todasOpciones=["explorar"]

	if (personaje.tieneEfecto(this.efectoNecesario.at(0))) var a=this.todasOpciones.at(1) //
	else a=null;
	if (personaje.tieneEfecto(this.efectoNecesario.at(1))) var b=this.todasOpciones.at(3)//
	else b=null;
	this.arrayOpciones.at(0)=todasOpciones.at(0);      // 
	this.arrayOpciones.at(1)=a;   			      // 
	this.arrayOpciones.at(2)=todasOpciones.at(2);	  //
	this.arrayOpciones.at(3)=b;					  // 
	
this.indiceConsecuencias=0;
arrayOpciones.forEach(arrayOpcion=>console.log(arrayOpcion));     
return this.indiceConsecuencias;

}


}
