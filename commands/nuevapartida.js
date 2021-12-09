//Remember to run " node deploy-commands.js " to register your commands!
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Interaction } = require("discord.js");
const Game = require('../game.js')
const Personaje = require('../personaje.js')
const DicordGameHelper = require('../helpers/discordGameHelper.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuevapartida')
        .setDescription('Crea una partida nueva')
        .addSubcommand(subcommand =>
            subcommand
            .setName('nombre')
            .setDescription('Nombre del personaje')
            .addStringOption(option => 
                option.setName('nombre')
                .setDescription('El nombre del personaje')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('clase')
            .setDescription('La clase del personaje')
            .addStringOption(option =>
                option.setName("clase")
                .setDescription("Es la clase del personaje")
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('historia')
            .setDescription('El nombre de la historia a jugar')
            .addStringOption(option =>
                option.setName("historia")
                .setDescription("El nombre de la historia a jugar")
                .setRequired(true)
            )
        ),
    async execute(interaction, game) {
        const nombrePersonaje = interaction.options.getString('nombre');
        if (nombrePersonaje){
            game.getParcial(interaction.user.id, interaction.guild.id).nombrePersonaje = nombrePersonaje
        };
        const clasePersonaje = interaction.options.getString('clase');
        if (clasePersonaje){
            game.getParcial(interaction.user.id, interaction.guild.id).clasePersonaje = clasePersonaje
        };
        const nombreHistoria = interaction.options.getString('historia');
        if (nombreHistoria){
            game.getParcial(interaction.user.id, interaction.guild.id).nombreHistoria = nombreHistoria
        };
        if(game.parcialCompleto(interaction.user.id, interaction.guild.id)){
            console.log('Creando personaje...')
            const parcial = game.getParcial(interaction.user.id, interaction.guild.id)
            const personaje = game.crearPersonaje(parcial.nombrePersonaje, parcial.clasePersonaje, parcial.nombreHistoria)
            game.crearNarrativa(interaction.guild_id , interaction.user, nombreHistoria, personaje)
            const embedPersonaje = DicordGameHelper.embedPersonaje(personaje)
            return interaction.reply({ embeds: [embedPersonaje] }
                                    );//{ embeds: [embed] }
        };
        //console.log("returnde de getparcial: " + game.getParcial(interaction.user.id, interaction.guild.id))
        
        return interaction.reply({ content: 'Creando Personaje...\n Nombre: ' + game.getParcial(interaction.user.id, interaction.guild.id).nombrePersonaje + '\n Historia: ' + 
                                game.getParcial(interaction.user.id, interaction.guild.id).nombreHistoria + '\n Clase: ' + 
                                game.getParcial(interaction.user.id, interaction.guild.id).clasePersonaje
                                , ephemeral: true });
    },
};