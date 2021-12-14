//Remember to run " node deploy-commands.js " to register your commands!
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Interaction } = require("discord.js");
const Game = require('../game.js')
const Personaje = require('../personaje.js')
const DicordGameHelper = require('../helpers/discordGameHelper.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testnuevapartida')
        .setDescription('Crea una partida nueva de test'),
    async execute(interaction, game) {
        game.historiaParcial(interaction.user.id, interaction.guild.id,'Testeando')
        game.claseParcial(interaction.user.id, interaction.guild.id,'Guerrero')
        game.nombreParcial(interaction.user.id, interaction.guild.id,'Tester El test')
        if(game.parcialCompleto(interaction.user.id, interaction.guild.id)){
            console.log('Creando personaje...')
            const personaje = game.parcial2Personaje(interaction.user.id, interaction.guild.id)
            if(!personaje) return interaction.reply({ content: "error: no existe la clase" , ephemeral: true});
            if(!game.crearPartida(interaction.guild_id , interaction.user, 'Testeando', personaje)){
                return interaction.reply({ content: "error: no existe la historia" , ephemeral: true});
            }
            const embedPersonaje = DicordGameHelper.embedPersonaje(personaje)
            return interaction.reply({ embeds: [embedPersonaje] , ephemeral: true });
        };
        return interaction.reply({ content: `error...`
                                    , ephemeral: true });
    },
};