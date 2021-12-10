const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton  } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('continuarpartida')
		.setDescription('Continuar la partida'),
	async execute(interaction,game) {
		const partida = game.partidaDe( interaction.user , interaction.guild_id)
		const opciones = partida.narrativa.imprimirOpciones(personaje)
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("1")
					.setLabel("A")
					.setStyle("PRIMARY"),

				new MessageButton()
					.setCustomId("opt-B")
					.setLabel("B")
					.setStyle("PRIMARY"),
						
				new MessageButton()
					.setCustomId("opt-C")
					.setLabel("C")
					.setStyle("PRIMARY"),
			);
        return interaction.reply({content: "Main menu", ephemeral: true, components: [row]})
	},
};
