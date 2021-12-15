const { SlashCommandBuilder } = require('@discordjs/builders');
const DicordGameHelper = require('../helpers/discordGameHelper.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ayuda')
		.setDescription('Ayuda del juego'),
	async execute(interaction,game) {

        return interaction.reply({content: `
        Para crear un personaje use:\n
        /nuevapartida nombre [Nombre del personaje]\n
        /nuevapartida historia [Elija un nombre de historia valido]\n
        /nuevapartida clase [Elija una clase valida de personaje]\n
\n
        Para listar las clases validas primero asigne un nombre de historia y luego use\n
        /listarclases\n
\n
        Para comenzar la partida use:\n
        /continuarpartida\n
\n
        La hoja de personaje no se actualiza automaticamente\n
        Para actualizarla usar:\n
        /personaje
        `, ephemeral: true, components: [row]})
	},
};
