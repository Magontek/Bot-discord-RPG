const fs = require('fs');
const { Client, Collection, Intents , MessageActionRow , MessageSelectMenu } = require('discord.js');
const { token } = require('./config.json');
const Game = require('./Game.js')
const DicordGameHelper = require('./helpers/discordGameHelper.js')


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
		if(interaction.customId=='eliminarpartida'){
			game.eliminarPartida( interaction.user, interaction.guild_id )
			console.log(`${interaction.user.id} Elimino su partida`)
			return interaction.update({content: `Partida terminada`, ephemeral: true , components: []});
		}
		const entero = parseInt(interaction.customId,10)
		if(Number.isInteger(entero)){
			console.log(`${interaction.user.id} Eligio opcion ${entero}`)
			const textoSeleccion = game.seleccionarOpcionPara(entero, interaction.user, interaction.guild_id)
			const opciones = game.imprimirOpcionesPara(interaction.user , interaction.guild_id)
			const enunciado = game.imprimirEnunciado(interaction.user , interaction.guild_id)
			const row = DicordGameHelper.embedEnunciado(opciones)
			await interaction.update({content: `${textoSeleccion} \n ${enunciado}`, ephemeral: true, components: [row]})
		}
	};
	if (interaction.isSelectMenu()){
		if(interaction.customId == 'historia'){
			game.historiaParcial(interaction.user.id, interaction.guild.id,interaction.values[0])
			const opciones = []
			const clasesDePersonaje = game.listarClasesDePersonaje(interaction.user.id, interaction.guild.id)
			clasesDePersonaje.forEach(element => {
				opciones.push({
					label: element,
					value: element,
				})
			});
			const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('clase')
						.setPlaceholder('Selecciona una clase')
						.addOptions(opciones),
				);
			const parcial = game.getParcial(interaction.user.id, interaction.guild.id)
			console.log(`Historia elegida: ${parcial.nombreHistoria}`)
			const embedParcial = DicordGameHelper.embedParcial(parcial)
			await interaction.update({ content: '--------' , ephemeral: true , embeds : [embedParcial] , components: [row] }); //
		}
		if(interaction.customId == 'clase'){
			game.claseParcial(interaction.user.id, interaction.guild.id,interaction.values[0])
			const parcial = game.getParcial(interaction.user.id, interaction.guild.id)
			if(game.parcialCompleto(interaction.user.id, interaction.guild.id)){
				console.log('Creando personaje...')
				const personaje = game.parcial2Personaje(interaction.user.id, interaction.guild.id)
				if(!personaje) return interaction.reply({ content: "error: no existe la clase" , ephemeral: true});
				if(!game.crearPartida(interaction.guild_id , interaction.user, parcial.nombreHistoria, personaje)){
					return interaction.reply({ content: "error: no existe la historia" , ephemeral: true});
				}
				const embedPersonaje = DicordGameHelper.embedPersonaje(personaje)
				await interaction.update({ephemeral: true , embeds : [embedPersonaje]  , components: []}); //
			};
		}
	}
	
	if (!interaction.isCommand()) return;
	console.log(`${interaction.user.id} envia ${interaction.commandName}`)
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
