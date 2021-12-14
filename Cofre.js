const Evento = require('./Evento.js')
//_____________COFRE______________________

module.exports = class Cofre extends Evento                            // ---------------Hereda de Puerta ,no de evento !!
{ constructor(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias,abierto,dureza,contenido)         
  { 
    super(nombre,id,narrativa,enunciado,efectoNecesario,oculto,consecuencias)
    this.abierto=abierto;//booleano
    this.dureza=dureza;	//entero  
    this.contenido=contenido; // Objeto
  }
  opciones(personaje)
  {  
    var todasOpciones=["Abrir","Abrir Cofre Con${objeto}","Destruir","Destruir Cofre Con ${objeto}"];

		var a = ''
		var b = ''

    if (personaje.tieneEfecto("abrirCerradura")=!null || personaje.tieneEfecto(this.efectoNecesario)) a=todasOpciones.at(1) //abrirCon =>abrirCerradura
    if (personaje.tieneEfecto("ataque")!=null) b=todasOpciones.at(3) //destruirCon=>ataque
    arrayOpciones.push(todasOpciones.at(0));      // ABRIR
    arrayOpciones.push(a);   			   // ABRIR CON
    arrayOpciones.push(todasOpciones.at(2))	  //DESTRUIR
    arrayOpciones.push(b);				  //DESTRUIR CON

    return arrayOpciones 
  
  }
  
	abrir(personaje){
		if(abierto)
		{
      return this.tomarItem(personaje); // abrir agarra item	
		}
    else return false
    }
      abrirCon(personaje)
    {
    if( personaje.tieneEfecto("abrirCerradura")!=null || personaje.tieneEfecto(this.efectoNecesario)!=null )// abrir con llave/abrirCerradura agarra item
    {
      abierto=true;
      return this.tomarItem(personaje);
    }
    else return false
  }


  tomarItem(personaje)
  {   
    if( !personaje.agregarItem(contenido)) contenido=null;           // Agrega el item del cofre a la lista de ítems ,si el personaje está usando contenido=null-------------------------
  }


  defenderDe(personaje)
  { 
	  if(personaje.getNivel()>this.dureza) return true;
	  else  var random=Math.random() ;      // math.random genera un numero pseudo aleatorio rango [0, 1)
	  if(random<=0.5)contenido=null;
 
	return false
	}
  
  defenderDeItem(personaje)
  {
    if((personaje.getNivel()+personaje.tieneEfecto("ataque").potencia  )>this.dureza)return true;
    else 	var random=Math.random()        // math.random genera un numero pseudo aleatorio rango [0, 1)
    if(random<=0.5)contenido=null
    return false;
  }
}
