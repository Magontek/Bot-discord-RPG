const { SlashCommandBuilder } = require('@discordjs/builders');
const DicordGameHelper = require('../helpers/discordGameHelper.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listarclases')
		.setDescription('Lista las clases de personaje disponibles'),
	async execute(interaction,game) {
        
		const respuesta = game.listarClasesDePersonaje(interaction.user.id, interaction.guild.id).toString()
        console.log(`Clases de personaje: ${respuesta}`)
		return interaction.reply({ content: respuesta });
	},
};
