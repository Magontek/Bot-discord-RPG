const { SlashCommandBuilder } = require('@discordjs/builders');
const DicordGameHelper = require('../helpers/discordGameHelper.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('personaje')
		.setDescription('Beep!'),
	async execute(interaction,game) {
		const personaje = game.personajeDe(interaction.user,interaction.guild_id)
		console.log(`Nombre del personaje: ${personaje.nombre}`)
		if (!personaje) return interaction.reply({ content: 'Todavia no creaste un personaje' , ephemeral: true });
		const embedPersonaje = DicordGameHelper.embedPersonaje(personaje);
		return interaction.reply({ embeds: [embedPersonaje] , ephemeral: true });
	},
};
