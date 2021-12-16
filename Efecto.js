module.exports = class Efecto { 
    constructor (nombre,potencia,cantidadDeUsos){
        this.nombre=nombre;
        this.potencia=potencia;
        this.cantidadDeUsos=cantidadDeUsos;
    }

    usar(){
     
       if (this.cantidadDeUsos > 0){
            this.cantidadDeUsos=this.cantidadDeUsos-1
        }
        if(puedeUsar()==true){
            return true
        }
        if(this.cantidadDeUsos==0){
            return false
        }

    }
    
    puedeUsar(){
      
       if (this.cantidadDeUsos != 0){
            return true
       }
        
    }
}
