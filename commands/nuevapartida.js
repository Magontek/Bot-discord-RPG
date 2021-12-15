//Remember to run " node deploy-commands.js " to register your commands!
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow , MessageSelectMenu } = require("discord.js");
const Game = require('../Game.js')
const Personaje = require('../Personaje.js')
const DicordGameHelper = require('../helpers/discordGameHelper.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuevapartida')
        .setDescription('Crea una partida nueva')
        .addStringOption(option => 
            option.setName('nombre')
            .setDescription('El nombre del personaje')
            .setRequired(true)
        ),
    async execute(interaction, game) {

        const nombrePersonaje = interaction.options.getString('nombre');
        if (nombrePersonaje){
            console.log(`Personaje: ${nombrePersonaje}`)
            game.nombreParcial(interaction.user.id, interaction.guild.id,nombrePersonaje)
            
        };
        const parcial = game.getParcial(interaction.user.id, interaction.guild.id)

        const embedParcial = DicordGameHelper.embedParcial(parcial)

        const opciones = []
        game.listarHistorias().forEach(element => {
            opciones.push({
                label: element,
                value: element,
            })
        });
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('historia')
					.setPlaceholder('Selecciona una historia')
                    .addOptions(opciones),
			);

        return interaction.reply({ ephemeral: true , embeds : [embedParcial] , components: [row] }); //
    },
};
/*
const nombreHistoria = interaction.options.getString('historia');
if (nombreHistoria){
    console.log(`Historia: ${nombreHistoria}`)
    game.historiaParcial(interaction.user.id, interaction.guild.id,nombreHistoria)
};
const clasePersonaje = interaction.options.getString('clase');
if (clasePersonaje){
    console.log(`Clase ${clasePersonaje}`)
    game.claseParcial(interaction.user.id, interaction.guild.id,clasePersonaje)
};
.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
*/