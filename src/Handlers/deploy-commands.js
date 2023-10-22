/** @format */

// deploy-commands.js
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, deploymentCommands, Token } = require("../Config/config.json");

function deployCommands(client) {
	const rest = new REST({ version: "10" }).setToken(Token);

	(async () => {
		try {
			console.log(`Started refreshing ${client.commands.size} application (/) commands.`);

			const commands = client.commands.map((command) => command.data);

			const data = await rest.put(
				Routes.applicationGuildCommands(client.user.id, "1148379936915202138"), // Replace 'your-guild-id' with your actual guild ID
				{ body: commands }
			);

			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			console.error(error);
		}
	})();
}

module.exports = deployCommands;
