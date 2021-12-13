class Evento{
		//________________CONSTRUCTORES____________________
	constructor(nombre,enunciado,oculto,itemNecesario,items,consecuencias,opciones,opcionCondicional){
		this.nombre=nombre;
		this.enunciado=enunciado;
		this.oculto=oculto;
		this.items=items;
		this.itemNecesario=itemNecesario;
		this.consecuencias=consecuencias;
		this.opciones=opciones;
		this.opcionCondicional=this.opcionCondicional;
	};
	
		//________________METODOS____________________
	miNombre() {return this.nombre;}         				  	 // Retorna nombre
	miEnunciado(){return this.enunciado;}    					 // Retorna enunciado
	estaOculto(){return this.oculto;}     					     // Retorna si el evento esta oculto
	tengoItem(){ return items.some(item=>item==itemNecesario);}  // retorna bool ,si tengo efecto/item para la opcion----??
	//_______________________________________________
    queConsecuencias(){return consecuencias;}     				 //Retorna Posibles consecuencias

	seleccionaOpcion(numero){ if((numero==3)&&this.tengoItem())return this.opciones.at(2);               //opcion 3_condicional  -con item
		else if(numero==3 &&(!this.tengoItem())) return console.log("No puedes realizar esta opcion") ;  // sin item 
		else return this.opciones.at(numero-1) ;}					   			                         // Eligo opcion  entre 1 y 2-indiferenete Item


	
}
/*
___________________Programa___Parte1____________________
___________________Realizado_______________________
Nombre:String  ------------------------------------
Enunciado :String  --------------------------------
Oculto (Boolean)   --------------------------------
Efecto Necesario: Array (item)---------------------
Consecuencias Array(evento)------------------------

___________________En progreso_______________________
Selecciona Opcion :objeto (evento)==>reemplazar-texto-por-evento-
---------------------------
___________________Falta_______________________
Opciones(personaje):array (evento)
Narrativa:obj(narrativa) ---Que tiene que hacer ??????
___________________Programa___Parte2____________________

 Puerta ,Cofre ,Enemigo(personaje) , habitacion
 
 */
/*__________________________________________Ejemplo_________________________*/
/*__________________________________________Declaraciones_________________________*/
const combate=new Evento(nombre="Combate",enunciado="te encuentras con un enemigo", oculto=false,items=["llave"],itemNecesario=["llave"],
consecuencias=[]);
const combate2=new Evento(nombre="Combate",enunciado="te encuentras con un enemigo", oculto=false,items=["maza"],itemNecesario=["llave"],
consecuencias=[]);

const abrirPuerta=new Evento(nombre="Puerta de madera",enunciado="te encuentras una puerta de madera", oculto=false,items=["llave"],itemNecesario=["llave"],
consecuencias=[combate,combate2],opciones=["Vuelvo atras-Opcion 1","Rompo la puerta-Opcion 2","Abro con llave -Opcion 3-Condicional"]);
/*__________________________________________Console_Log_________________________*/
console.log("Evento:  "+abrirPuerta.miNombre ()  );
console.log( "Nombre: "+abrirPuerta.miEnunciado() );
console.log( "Esta oculto ?: "+abrirPuerta.estaOculto() );
console.log( "Tengo item para el evento ? "+abrirPuerta.tengoItem() );
console.log( "Posibles consecuencias: "+ abrirPuerta.queConsecuencias() );
console.log( "selecciono opcion 1 : "+ abrirPuerta.seleccionaOpcion(1));
console.log( "selecciono opcion 2 : "+ abrirPuerta.seleccionaOpcion(2));
console.log( "selecciono opcion 3 : "+ abrirPuerta.seleccionaOpcion(3)); //depende de items ["llave"]
