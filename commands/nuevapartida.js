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
            .setName('historia')
            .setDescription('El nombre de la historia a jugar')
            .addStringOption(option =>
                option.setName("historia")
                .setDescription("El nombre de la historia a jugar")
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
            .setName('nombre')
            .setDescription('Nombre del personaje')
            .addStringOption(option => 
                option.setName('nombre')
                .setDescription('El nombre del personaje')
                .setRequired(true)
            )
        ),
    async execute(interaction, game) {
        const nombreHistoria = interaction.options.getString('historia');
        if (nombreHistoria){
            console.log(`Historia: ${nombreHistoria}`)
            game.nombreParcial(nombreHistoria)
        };
        const clasePersonaje = interaction.options.getString('clase');
        if (clasePersonaje){
            console.log(`Clase ${clasePersonaje}`)
            game.claseParcial(clasePersonaje)
        };
        const nombrePersonaje = interaction.options.getString('nombre');
        if (nombrePersonaje){
            console.log(`Personaje: ${nombrePersonaje}`)
            game.nombreParcial(clasePersonaje)
        };
        
        if(game.parcialCompleto(interaction.user.id, interaction.guild.id)){
            console.log('Creando personaje...')
            const personaje = game.parcial2Personaje(interaction.user.id, interaction.guild.id)
            if(!personaje) return interaction.reply({ content: "error: no existe la clase" , ephemeral: true});
            if(!game.crearPartida(interaction.guild_id , interaction.user, nombreHistoria, personaje)){
                return interaction.reply({ content: "error: no existe la historia" , ephemeral: true});
            }
            const embedPersonaje = DicordGameHelper.embedPersonaje(personaje)
            return interaction.reply({ embeds: [embedPersonaje] , ephemeral: true });
        };
        return interaction.reply({ content: 'Creando Personaje...\n Nombre: ' + game.getParcial(interaction.user.id, interaction.guild.id).nombrePersonaje + '\n Historia: ' + 
                                game.getParcial(interaction.user.id, interaction.guild.id).nombreHistoria + '\n Clase: ' + 
                                game.getParcial(interaction.user.id, interaction.guild.id).clasePersonaje
                                , ephemeral: true });
    },
};