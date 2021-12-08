class Personaje{
    constructor(nombre, items, maxItems, poderes, maxPoderes, nombreClase){
        this.nombre = nombre
        this.experiencia =0
        this.items = items
        this.maxItems = maxItems
        this.poderes = poderes
        this.maxPoderes = maxPoderes
        this.clase = nombreClase
    }
    
    //Retorna el nivel del personaje calculado como experiencia/1000 redondeado hacia arriba
    getNivel(){
        
    }
    //Agrega la cantidad int de experiencia al personaje
    addExperiencia(int){

    }
    //Retorna todos los objetos que contengan el efecto.
    tieneEfecto(efecto){

    }
    //Retorna la cantidad de ítems que posee en este momento.
    cantidadDetems(){

    }
    //Retorna la cantidad de poderes que posee en este momento.
    cantidadDePoderes(){

    }
    //Agrega un item a la lista si maxItems<cantidadDeItems(). Retorna True si es posible agregar el Item.
    agregarItem(item){

    }
    //Agrega un poder a la lista si maxPoderes<cantidadDeIPoderes(). Retorna True si es posible agregar el Item.
    agregarPoder(poder){

    }
    /*Retorna un string con el resultado del uso del objeto.
    Si puedeUsar(efecto)==true y usar(efecto)==true retorna “Usas el objeto en el objetivo”
    Si puedeUsar(efecto)==true y usar(efecto)==false retorna “Usas el objeto en el objetivo pero se destruyó”. Elimina el efecto del objeto.
    Si puedeUsar(efecto)==false retorna “No podes usar el objeto” */
    usarEfectoDeObjeto(objeto, efecto){
        
    }
    
    imprimirPersonaje(){

    }
}
