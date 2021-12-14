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
		var index = 0
		opciones.forEach(element => {
			if(element!=''){
				row.addComponents(
					new MessageButton()
						.setCustomId(index.toString())
						.setLabel(element)
						.setStyle("PRIMARY"),
				)
			}
			index += 1
		});
        return interaction.reply({content: `Descripcion: ${enunciado}`, ephemeral: true, components: [row]})
	},
};
