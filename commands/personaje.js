const { SlashCommandBuilder } = require('@discordjs/builders');
const DicordGameHelper = require('../helpers/discordGameHelper.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('personaje')
		.setDescription('Beep!'),
	async execute(interaction,game) {
		const embedPersonaje = DicordGameHelper.embedPersonaje(game.personajeDe(interaction.user,interaction.guild_id));
		return interaction.reply({ embeds: [embedPersonaje] });
	},
};
