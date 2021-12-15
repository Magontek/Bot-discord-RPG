const Personaje = require('../Personaje.js')
const { MessageEmbed , MessageActionRow , MessageButton } = require("discord.js");

module.exports = class discordGameHelper{
    static embedPersonaje(personaje){
        const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Nombre: ${personaje.nombre}`)
                    .setDescription('Es es el heroe de la historia')
                    .addField('Experiencia', personaje.experiencia.toString(), true)
                    .addField('Clase:', personaje.clase, true)

        if(personaje.items!=[]){
            personaje.items.forEach(element => {
                if(element){
                    embed.addField( `${element.nombre}` , `Efectos: ${element.efectos.map(efecto => efecto.nombre).toString()}`)
                }
            })
        }
        
        return embed
    }


    /**({userID : userId, 
        guildID : guildId, 
        nombrePersonaje : '', 
        clasePersonaje : '', 
        nombrehistoria : ''
    }); */
    static embedParcial(parcial){
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Creando personaje...`)
        if (parcial.nombrePersonaje) embed.addField('Nombre: ', parcial.nombrePersonaje, true)
        if (parcial.nombreHistoria) embed.addField('Historia: ', parcial.nombreHistoria, true)
        if (parcial.clasePersonaje) embed.addField('Clase: ', parcial.clasePersonaje, true)

        return embed
    }

    static embedEnunciado(opciones){
        const row = new MessageActionRow()
		var index = 0
		opciones.forEach(element => {
			if(element!=''){
				row.addComponents(
					new MessageButton()
						.setCustomId(index.toString())
						.setLabel(element)
						.setStyle("PRIMARY"),
				)
			}
			index += 1
		});
        return row
    }
}