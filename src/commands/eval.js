require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "eval",
	aliases: ["이발", "dlqkf"],

	run: async (client, message, args) => {
		async function clean(text) {
			if (text && text.constructor.name == "Promise") text = await text;

			if (typeof text !== "string") text = require("util").inspect(text, { depth: 1 });

			text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
			text = text.replaceAll(client.token, "[TOKEN]");

			return text;
		}

		async function handleLargeResult(result) {
			const filePath = "result.js";
			fs.writeFileSync(filePath, result);

			await message.reply("파일 참고");
			await message.channel.send({ files: [filePath] });

			fs.unlinkSync(filePath);
		}

		const ownerID = process.env.BOT_OWNER_ID;
		if (message.author.id !== ownerID) return;

		try {
			const evaled = eval(`const player = client.manager.get(message.guild.id); ${args.join(" ")}`);

			const cleaned = await clean(evaled);
			if (cleaned.length > 2000) {
				await handleLargeResult(cleaned);
			} else {
				message.reply(`\`\`\`js\n${cleaned}\n\`\`\``);
			}
		} catch (err) {
			const cleaned = await clean(err);
			if (cleaned.length > 2000) {
				await handleLargeResult(cleaned);
			} else {
				message.reply(`\`ERROR\` \`\`\`xl\n${cleaned}\n\`\`\``);
			}
		}
	},
};
