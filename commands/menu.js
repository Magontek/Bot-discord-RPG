 //Remember to run " node deploy-commands.js " to register your commands!

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed  } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("menu")
        .setDescription("Brings up the Main Menu"),
    async execute(interaction, client) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("opt-A")
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