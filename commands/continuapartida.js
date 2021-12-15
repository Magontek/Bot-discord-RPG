const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton  } = require("discord.js");
const Game = require('../game.js')
const DicordGameHelper = require('../helpers/discordGameHelper.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('continuarpartida')
		.setDescription('Continuar la partida'),
	async execute(interaction,game) {
		if(!game.existePartidaDe(interaction.user , interaction.guild_id)){
			return interaction.reply({ content: 'No existe la partida' , ephemeral: true});
		}
		const opciones = game.imprimirOpcionesPara(interaction.user.id , interaction.guild_id)
		console.log(`Opciones: ${opciones}`)
		const enunciado = game.imprimirEnunciado(interaction.user.id , interaction.guild_id)
        const row = DicordGameHelper.embedEnunciado(opciones)
        return interaction.reply({content: `Descripcion: ${enunciado}`, ephemeral: true, components: [row]})
	},
};
