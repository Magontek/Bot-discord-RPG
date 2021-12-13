module.export = class Efecto {}

class Efecto { 
    constructor (Nombre,Potencia,CantidadDeUsos){
        this.Nombre=Nombre;
        this.Potencia=Potencia;
        this.CantidadDeUsos=CantidadDeUsos;
    }

    usar(){
     
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
      
       if (this.cantidadDeUsos != 0){
            return true
       }
        
    }
}
