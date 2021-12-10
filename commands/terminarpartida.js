const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton  } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('terminarpartida')
		.setDescription('¿Terminar partida?'),
	async execute(interaction) {
		const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("cancelar")
                .setLabel("Cancelar")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("eliminarpartida")
                .setLabel("Eliminar")
                .setStyle("SECONDARY"),
		);
		return interaction.reply({content: "Main menu", ephemeral: true, components: [row]});
	},
};
