// const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
// const GoogleDocs = require("googledocs");
// import {google} from GoogleDocs;
const infos = require("./infos.json");
const TOKEN_DISCORD = infos.discordToken;
// const ChannelID = infos.channelID;
// const ChannelID2 = infos.channelID2;
client.on("ready", function() {
	console.log("Logged in as ".concat(client.user.tag, "!"));
});
client.login(TOKEN_DISCORD);
const prefix = "%";
const set1 = infos.set1;
const set2 = infos.set2;
const set3 = infos.set3;
client.on("messageCreate", function(msg) {
	if (msg.author.bot) {return;}
	// if (msg.channel.id !== ChannelID) {return;}
	if (!msg.content.includes(prefix)) {return;}
	const commandBody = msg.content.slice(prefix.length);
	const args = commandBody.split(" ");
	const command = args.shift().toLowerCase();
	set1.forEach(element => {
		if (command === element) {
			msg.reply(set1[3]);
		}
	});
	set2.forEach(element => {
		if (command === element) {
			msg.reply(set2[6]);
		}
	});
	set3.forEach(element => {
		if (command === element) {
			msg.reply(set3[2]);
		}
	});
	if (command === "ping") {
		msg.reply("pong!");
	}
	if (command === "say") {
		console.log(args);
		msg.reply(args.join(" "));
	}
});