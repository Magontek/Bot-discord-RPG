//Remember to run " node deploy-commands.js " to register your commands!
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu, Interaction  } = require("discord.js");
const { Game } = require('../game.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nuevapartida")
        .setDescription("Nueva partida")
        .addStringOption(option => option.setName('nombreHistoria').setDescription('Nombre de la historia'))
        .addStringOption(option => option.setName('nombrePersonaje').setDescription('Nombre del personaje'))
        .addStringOption(option => option.setName('clasePersonaje').setDescription('Clase del personaje')),
    async execute(interaction, game) {
        const nombreHistoria = interaction.options.getString('nombreHistoria');
        const nombrePersonaje = interaction.options.getString('nombrePersonaje');
        const clasePersonaje = interaction.options.getString('clasePersonaje');
        const personaje = Game.Personaje(nombrePersonaje, clasePersonaje, nombreHistoria)
        game.crearNarrativa(interaction.guild_id , interaction.user, nombreHistoria, personaje)

        const embed = new MessageEmbed().setTitle('testing');
        return interaction.reply({ embeds: [ embed ] })
    },
};