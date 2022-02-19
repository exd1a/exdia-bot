// const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const { google } = require("googleapis");
const infos = require("./infos.json");
const documentId = infos.testDocsID;
const helpMessage = infos.helpMessage;
const TOKEN_DISCORD = infos.discordToken;
// const ChannelID = infos.channelID;
// const ChannelID2 = infos.channelID2;
const auth = new google.auth.GoogleAuth({
	keyFile: "credentials.json",
	scopes: "https://googleapis.com/auth/documents",
});
function basicReplyWithArgs(arr, name, msg, args, command) {
	arr.forEach(element => {
		if (command === element) {
			if (args.length === 0) {
				msg.reply(`nothing to see here ${name}`);
				return;
			}
			msg.reply(`poopers ${name}: ${args.join(" ")}`);
		}
	});
}
client.on("ready", function() {
	console.log("Logged in as ".concat(client.user.tag, "!"));
});
const prefix = "%";
client.login(TOKEN_DISCORD);
const set1 = infos.set1;
const set2 = infos.set2;
const set3 = infos.set3;
client.on("messageCreate", async function(msg) {
	const googleClient = await auth.getClient();
	const googleDocs = google.docs({ version: "v1", auth: googleClient });
	const metadata = await googleDocs.documents.get({
		auth,
		documentId,
	});
	console.log(metadata.data);
	if (msg.author.bot) {return;}
	// if (msg.channelId !== ChannelID) {return;}
	if (!msg.content.includes(prefix)) {return;}
	const commandBody = msg.content.slice(prefix.length);
	const args = commandBody.split(" ");
	const command = args.shift().toLowerCase();
	if (command === "ping") {
		msg.reply("pong!");
	}
	if (command === "say") {
		console.log(args);
		msg.reply(args.join(" "));
	}
	if (command === "help") {
		console.log(args);
		msg.reply(helpMessage);
	}
	basicReplyWithArgs(set1, "user1", msg, args, command);
	basicReplyWithArgs(set2, "user2", msg, args, command);
	basicReplyWithArgs(set3, "user3", msg, args, command);
});