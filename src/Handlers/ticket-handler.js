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
let fetchdata = [];

async function ticketHandler(client) {
	const tickets = await prisma.category.findMany();
	let ButtonArray = [];
	if (JSON.stringify(fetchdata) != JSON.stringify(tickets)) {
		fetchdata = [...tickets];
		const channel = client.channels.cache.get("1162798443346014222");
		const embed = new EmbedBuilder();
		embed.setTitle("Tickets");
		embed.setDescription(
			"Welkom bij het ticket systeem van orange development. \n\n Klik op de knop om een ticket te openen."
		);
		embed.setColor("#FFA500");

		for (const ticket of tickets) {
			const button = new ButtonBuilder();
			button.setLabel(ticket.label);
			button.setCustomId(ticket.id + "ticket");
			button.setStyle(ButtonStyle.Success);
			if (ticket.is_active == false) {
				button.setStyle(ButtonStyle.Danger);
				button.setDisabled(true);
			}
			ButtonArray.push(button);
		}

		const actionRow = new ActionRowBuilder().addComponents(ButtonArray);

		const messages = await channel.messages.fetch();
		const botMessage = messages.find((msg) => msg.author.id === client.user.id);
		if (botMessage) {
			botMessage.edit({
				embeds: [embed],
				components: [actionRow],
			});
		} else {
			channel.send({
				embeds: [embed],
				components: [actionRow],
			});
		}
	} else {
		console.log("[ALERT] No changes");
	}
}

module.exports = ticketHandler;
