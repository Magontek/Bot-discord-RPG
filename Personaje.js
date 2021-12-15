const ObjetoUsable = require ('./ObjetoUsable.js')
const Efecto = require ('./Efecto.js')

module.exports = class Personaje {
    constructor (nombre,id,experiencia,items,maxItems,poderes,maxPoderes,clase){
        this.nombre=nombre;
        this.id=id;
        this.experiencia=experiencia;
        this.items=items;
        this.maxItems=maxItems;
        this.poderes=poderes;
        this.maxPoderes=maxPoderes;
        this.clase=clase;
    }
    
    getNivel(){ 
        return Math.ceil((this.experiencia/1000));
    }

    addExperiencia(int){ 
        this.experiencia + int;
    }

    tieneEfecto(efecto){
        return this.itemTieneEfecto(efecto).concat(this.poderTieneEfecto(efecto))
    }

    itemTieneEfecto(efecto){
        return this.items.filter(i=>i.contieneEfecto(efecto));  
    }

    poderTieneEfecto(efecto){
        return this.poderes.filter(i=>i.contieneEfecto(efecto));  
    }

    cantidadDeItems(){
        return this.items.length;
    }
    
    cantidadDePoderes(){
        return this.poderes.length;
    }

    agregarItem(item){ 
        if(this.esPosibleAgregarItem(item)){
            this.items.push(item)
            return true
        }
        return false
    }
    esPosibleAgregarItem(item){
        return maxItems > this.cantidadDeItems()     
    }
     
    agregarPoder(poder){
        if(this.esPosibleAgregarPoder(poder)){
            this.poderes.push(poder)
        }
    }
    esPosibleAgregarPoder(poder){
        return maxPoderes > this.cantidadDePoderes()
    }

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