/**
 * Copyright (c) 2023 Vyznite
 *   All rights reserved.
 *
 * @format
 */

const { Events, BaseInteraction } = require("discord.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const ticketHandler = require("../Handlers/ticket-handler");

module.exports = {
	name: Events.ClientReady,
	async execute(client) {
		console.log(`[INFO] Logged in as ${client.user.tag}!`);
		client.user.setPresence({ activities: [{ name: "Moet jij weten" }], status: "idle" });

		//! SETUP TICKET SYSTEM
		//* Onstart delete all messages in the channel
		const channel = client.channels.cache.get("1162798443346014222");
		await channel.messages.fetch().then((messages) => {
			channel.bulkDelete(messages);
		});
		//* Loop through database to check on changes
		setInterval(async () => {
			ticketHandler(client);
			console.log("Running ticket handler");
		}, 2000);
	},
};
