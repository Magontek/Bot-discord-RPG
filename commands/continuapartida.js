const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton  } = require("discord.js");
const Game = require('../game.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('continuarpartida')
		.setDescription('Continuar la partida'),
	async execute(interaction,game) {
		if(!game.existePartidaDe(interaction.user , interaction.guild_id)){
			return interaction.reply({ content: 'No existe la partida' , ephemeral: true});
		} 
		const opciones = game.imprimirOpcionesPara(interaction.user , interaction.guild_id)
		console.log(`Opciones: ${opciones}`)
		const enunciado = game.imprimirEnunciado(interaction.user , interaction.guild_id)
        const row = new MessageActionRow()
		opciones.forEach(element => {
			row.addComponents(
				new MessageButton()
					.setCustomId("1")
					.setLabel(element)
					.setStyle("PRIMARY"),
			)
		});
			/*.addComponents(
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
			);*/
        return interaction.reply({content: enunciado, ephemeral: true, components: [row]})
	},
};
