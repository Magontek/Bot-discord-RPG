
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
            a=todasOpciones.at(1) + ' con ' + personaje.tieneEfecto("abrirCerradura").at(0).nombre;
        }
        if (personaje.tieneEfecto(this.efectoNecesario.at(0)).length>0){
            console.log(`Personaje tiene efecto: ${personaje.tieneEfecto(this.efectoNecesario.at(0)).at(0)}`)
            a=todasOpciones.at(1) + ' con ' + personaje.tieneEfecto(this.efectoNecesario.at(0)).at(0).nombre;//abrirCon =>abrirCerradura --llave 
        }
        if (personaje.tieneEfecto("ataque").length>0 ){
            b=todasOpciones.at(3) + ' con ' + personaje.tieneEfecto("ataque").at(0).nombre;//destruirCon=>ataque
        }

        var arrayOpciones = []
        arrayOpciones.push(todasOpciones.at(0));      // ABRIR 
        arrayOpciones.push(a);   			      // ABRIRCON 
        arrayOpciones.push(todasOpciones.at(2));	  //DESTRUIR
        arrayOpciones.push(b);					  //DESTRUIR CON

        return arrayOpciones

    }
    //Este método recibe un personaje y devuelve True si el nivel del personaje supera la dureza de la puerta.
    defenderDe(personaje)				
    { 
        return personaje.getNivel()>this.dureza;
    }
    //Este método recibe un personaje y un ítem y devuelve True si el nivel del personaje más el valor de potencia del efecto ataque del ítem supera la dureza de la puerta.
    defenderDeItem(personaje)
    {
        return (personaje.getNivel()+(this.personaje.tieneEfecto("ataque").at(0)).potencia)>this.dureza;    //ataque
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