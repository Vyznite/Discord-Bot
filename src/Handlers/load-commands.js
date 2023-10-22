/**
 * Copyright (c) 2023 Vyznite
 *   All rights reserved.
 *
 * @format
 */

const fs = require("node:fs");
const path = require("node:path");

const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

function loadCommands(client) {
	console.log("[INFO] Commands will be loaded from the Commands folder.");

	const foldersPath = path.join(__dirname, "../Commands");
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			if ("data" in command && "execute" in command) {
				client.commands.set(command.data.name, command);
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
}

module.exports = loadCommands;
