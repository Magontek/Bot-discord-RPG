module.export = class ObjetoUsable {}

class ObjetoUsable {
    constructor(nombre,id,efectos,tipo,clase){ //efectos=Array de efectos
        this.nombre=nombre;
        this.id=id;
        this.efectos=efectos;
        this.tipo=tipo; //item o poder
        this.clase=clase; 
    }

    contieneEfecto(efecto){
        if(this.efecto== efecto){
            return efecto;
        }
        else{
            return null;
        }
    }

    puedeUsar(efecto){
        return (contieneEfecto(efecto)==efecto) && (efecto.puedeUsar()==true )//booleano
    }

    usar(efecto){
        return (contieneEfecto(efecto==efecto)) && (efecto.usar(self))//booleano
    }

}