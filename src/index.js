/**
 * Copyright (c) 2023 Vyznite
 *   All rights reserved.
 *
 * @format
 */

const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { Token } = require("./Config/config.json");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const loadCommands = require("./Handlers/load-commands");
const deployCommands = require("./Handlers/deploy-commands");
const loadEvents = require("./Handlers/load-events");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

client.login(Token).then(() => {
	loadEvents(client);
	loadCommands(client);
	deployCommands(client);
	prisma.$connect().then(() => {
		console.log("[INFO] Connected to the database.");
	});
});
