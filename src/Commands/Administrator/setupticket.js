/**
 * Copyright (c) 2023 Vyznite
 *   All rights reserved.
 *
 * @format
 */

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setupticket")
		.setDescription("Set up a ticket channel.")
		.addChannelOption((option) =>
			option.setName("channel").setDescription("The channel to set up.").setRequired(true)
		)
		.addRoleOption((option) =>
			option.setName("role").setDescription("The role to give to the ticket creator.").setRequired(true)
		),
	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");
		const role = interaction.options.getRole("role");

		if (!channel.type === "GUILD_TEXT") {
			await interaction.reply({
				content: "The channel must be a text channel!",
				ephemeral: true,
			});
			return;
		}

		// send a embed to the channel
		const embed = new EmbedBuilder()
			.setTitle("Ticket")
			.setDescription("React with 🎫 to open a ticket!")
			.setColor(0x0099ff)
			.setTimestamp();

		const message = await channel.send({ embeds: [embed] });
		await message.react("🎫");
	},
};
