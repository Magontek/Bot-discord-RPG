const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const Game = require('./game.js')


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const game = new Game()

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isButton()){
		console.log(interaction.customId);
		return interaction.reply({content: `Apretaste el boton ${interaction.customId}`, ephemeral: true});
	};
	
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction,game);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: '¡Error ejecutando el comando!', ephemeral: true });
	}
});

client.login(token);
