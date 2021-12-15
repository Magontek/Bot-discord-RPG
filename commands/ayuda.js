const { SlashCommandBuilder } = require('@discordjs/builders');
const DicordGameHelper = require('../helpers/discordGameHelper.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ayuda')
		.setDescription('Ayuda del juego'),
	async execute(interaction,game) {

        return interaction.reply({content: `Para crear una nueva partida use:
        /nuevapartida nombre [Nombre del personaje]

        Para listar las clases validas primero asigne un nombre de historia y luego use
        /listarclases

        Para comenzar la partida use:
        /continuarpartida

        La hoja de personaje no se actualiza automaticamente
        Para actualizarla usar:
        /personaje`, ephemeral: true})
	},
};
