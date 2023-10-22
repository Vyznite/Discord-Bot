/**
 * Copyright (c) 2023 Vyznite
 *   All rights reserved.
 *
 * @format
 */

const fs = require("node:fs");
const path = require("node:path");

function loadEvents(client) {
	const eventsPath = path.join(__dirname, "../Events");
	const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

	for (const file of eventFiles) {
		console.log(`[INFO] Loading event ${file}`);
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
	return eventFiles;
}

module.exports = loadEvents;
