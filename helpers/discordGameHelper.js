const Personaje = require('../personaje.js')
const { MessageEmbed } = require("discord.js");
/**
 * @param {Personaje} personaje - Un personaje
 */

module.exports = class discordGameHelper{
    static embedPersonaje(personaje){
    return new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(personaje.nombre)
        .setDescription('Es es el heroe de la historia')
        .addField('Experiencia', personaje.experiencia.toString(), true)
        .addField('Clase:', personaje.clase, true)
        .addFields(
            { name: 'Experiencia', value: personaje.experiencia.toString() },
            //{ name: '\u200B', value: '\u200B' },
            { name: 'Clase:', value: personaje.clase },
        )
        //.setImage('https://i.imgur.com/wSTFkRM.png')
        //.setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    }
}