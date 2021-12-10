const Personaje = require('../personaje.js')
const { MessageEmbed } = require("discord.js");

module.exports = class discordGameHelper{
    static embedPersonaje(personaje){
    return new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Nombre: ${personaje.nombre}`)
        .setDescription('Es es el heroe de la historia')
        .addField('Experiencia', personaje.experiencia.toString(), true)
        .addField('Clase:', personaje.clase, true)
        .addFields(
            { name: 'Items', value: 'Efectos' },
            { name: '\u200B', value: '\u200B' },
            /*personaje.items.forEach(element => {
                return {name: element.nombre , value: element.efectos.toString()}
            })*/
        )
        //.setImage('https://i.imgur.com/wSTFkRM.png')
        //.setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    }
}