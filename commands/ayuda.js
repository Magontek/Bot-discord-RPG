const { SlashCommandBuilder } = require('@discordjs/builders');
const DicordGameHelper = require('../helpers/discordGameHelper.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ayuda')
		.setDescription('Ayuda del juego'),
	async execute(interaction,game) {

        return interaction.reply({content: `Para crear un personaje use:
        /nuevapartida nombre [Nombre del personaje]
        /nuevapartida historia [Elija un nombre de historia valido]
        /nuevapartida clase [Elija una clase valida de personaje]

        Para listar las clases validas primero asigne un nombre de historia y luego use
        /listarclases

        Para comenzar la partida use:
        /continuarpartida

        La hoja de personaje no se actualiza automaticamente
        Para actualizarla usar:
        /personaje`, ephemeral: true})
	},
};
