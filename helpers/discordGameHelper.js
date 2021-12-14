const Personaje = require('../personaje.js')
const { MessageEmbed } = require("discord.js");

module.exports = class discordGameHelper{
    static embedPersonaje(personaje){
        const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Nombre: ${personaje.nombre}`)
                    .setDescription('Es es el heroe de la historia')
                    .addField('Experiencia', personaje.experiencia.toString(), true)
                    .addField('Clase:', personaje.clase, true)
                    .addFields(
                        { name: 'Items', value: 'Efectos' },
                        { name: '\u200B', value: '\u200B' }
                    )
/*
        personaje.items.forEach(element => {
            if(element){
                embed.addField({ name: `Nombre: ${element.nombre}` , value: `Efectos: ${element.efectos.toString()}`})
            }
        })*/
        return embed
    }
}