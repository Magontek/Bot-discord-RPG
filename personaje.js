class Personaje {
    constructor (Nombre,Experiencia,Items,MaxItems,Poderes,MaxPoderes,Clase,ID){
        this.Nombre=Nombre;
        this.Experiencia=Experiencia;
        this.Items=Items;
        this.MaxItems=MaxItems;
        this.Poderes=Poderes;
        this.MaxPoderes=MaxPoderes;
        this.Clase=Clase;
        this.ID=ID;
    }

    getNivel(){ //Retorna el nivel del personaje calculado como experiencia/1000 redondeado hacia arriba
        return Math.ceil((this.Experiencia/1000));
    }
    addExperiencia(int){ //Agrega la cantidad int de experiencia al personaje
        this.Experiencia += int;
    }
    tieneEfecto(efecto){
        //tieneEfecto(efecto) : Array(Efecto)
        //Retorna todos los objetos que contengan el efecto.

        return  Efectos.filter(i=>i.contieneEfecto(efecto));  //retorna los objetos que contienen el efecto deseado.
    }
//    cantidadDetems() : Int
//Retorna la cantidad de ítems que posee en este momento.
    cantidadDeItems(){
        return this.Items.length;
    }
    //cantidadDePoderes() : Int
    //Retorna la cantidad de poderes que posee en este momento.
    cantidadDePoderes(){
        return this.Poderes.length;
    }
//agregarItem(item) : Bool -----> ¿¿¿¿ SI AGREGO UN INTEM , PORQUE RETORNA UN BOOLEANO ???
//Agrega un item a la lista si maxItems<cantidadDeItems(). Retorna True si es posible agregar el Item. ----> ¿¿¿¿ SI LE PONGO MAX DE ITEMS POR EJEMPLO: 6. Y LA CANTIDAD DE ITEM QUE TENGO ESTE MOMENTO ES 3 , RETORNA FALSE.?????

//---------------------------------MANERA ALTERNATIVA COMO LO ENTENDÍ -------------------------------------
    agregarItem(item){ // 

        if(esPosibleAgregari(item)){
            this.Items.push(item) // añado item con la funcion .push
        }
    }
    esPosibleAgregari(item){
        return maxItems > cantidadDeItems()     //retorna true o false
    }
    //agregarPoder(poder) : Bool-----> ¿¿¿¿ SI AGREGO UN PODER , PORQUE RETORNA UN BOOLEANO ???
    //Agrega un poder a la lista si maxPoderes<cantidadDeIPoderes(). Retorna True si es posible agregar el PODER. ----> ¿¿¿¿ SI LE PONGO MAX DE PODERES POR EJEMPLO: 8. Y LA CANTIDAD DE PODERES QUE TENGO ESTE MOMENTO ES 3 , RETORNA FALSE.?????
    
//-----------------------------------MANERA ALTERNATIVA COMO LO ENTENDÍ-------------------------------------    
    agregarPoder(poder){
        if(esPosibleAgregarp(poder)){
            this.Poderes.push(poder)
        }
    }
    esPosibleAgregarp(poder){
        return maxPoderes > this.cantidadDePoderes()
    }
//usarEfectoDeObjeto(objeto, efecto) : Str
//Retorna un string con el resultado del uso del objeto.
//Si puedeUsar(efecto)==true y usar(efecto)==true retorna “Usas el objeto en el objetivo”
//Si puedeUsar(efecto)==true y usar(efecto)==false retorna “Usas el objeto en el objetivo pero se destruyó”. Elimina el efecto del objeto.
//Si puedeUsar(efecto)==false retorna “No podes usar el objeto”
    usarEfectoDeObjeto(objeto,efecto){

        if((objeto.puedeUsar(efecto)==true) && (objeto.usar(efecto)==true)){
            
            return "Usas el objeto en el objetivo"
        }
        if((objeto.puedeUsar(efecto)==true) && (objeto.usar(efecto)==true)){
            return "Usas el objeto en el objetivo pero se destruyó"
        }
        if(objeto.puedeUsar(efecto)==false){
            return "No podes usar el objeto"
        }
    }


}

class ObjetoUsable {
    constructor(Nombre,ID,Efectos,Tipo,Clase){ //efectos=Array de efectos
        this.Nombre=Nombre;
        this.ID=ID;
        this.Efectos=Efectos;
        this.Tipo=Tipo; //item o poder
        this.Clase=Clase; // ¿¿¿¿¿  mago,guerrero, bandido, etc. ?????
    }

    //contieneEfecto(efecto) : efecto
    //Retorna el efecto si es que lo contiene. Sino retorna Null.
    contieneEfecto(efecto){
        if(this.efecto== efecto){
            return efecto;
        }
        else{
            return null;
        }
    }

    //puedeUsar(efecto) : Bool
    //Retorna True si contieneEfecto(efecto)==efecto y efecto.puedeUsar()==true
    puedeUsar(efecto){
        return (contieneEfecto(efecto)==efecto) && (efecto.puedeUsar()==true )//booleano
    }
    //usar(efecto) : Bool
    //Retorna True si contieneEfecto(efecto)==efecto y efecto.usar(self)==true.
    usar(efecto){
        return (contieneEfecto(efecto==efecto)) && (efecto.usar(self))//booleano
    }


}

//class Item extends ObjetoUsable {
    
//}

//class Poder extends ObjetoUsable {

//}

class Efecto { //--------------------------------------> const abrirCerradura=new Efecto("abrirCerradura",100,3);
    constructor (Nombre,Potencia,CantidadDeUsos){
        this.Nombre=Nombre;
        this.Potencia=Potencia;
        this.CantidadDeUsos=CantidadDeUsos;
    }

    usar(){
        //Si cantidadDeUsos>0 resta 1. Si después de eso puedeUsar()==true retorna true
       // Retorna false si cantidadDeUsos ==0
       if (this.CantidadDeUsos > 0){
            this.cantidadDeUsos=this.CantidadDeUsos-1
        }
        if(puedeUsar()==true){
            return true
        }
        if(this.CantidadDeUsos==0){
            return false
        }

    }
    puedeUsar(){
       // Retorna true si cantidadDeUsos != 0.
       if (this.cantidadDeUsos != 0){
            return true// retorna un booleano
       }
        
    }
}

/*const abrirCerradura=new Efecto("abrirCerradura",100,3);
const espada = new ObjetoUsable ("escalibur",1,abrirCerradura,"Item","guerrero");
const personaje1 = new Personaje("pepon",50,espada,2)
*/