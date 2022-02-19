/* eslint-disable indent */
// const fs = require('fs');
const Discord = require('discord.js');
const { google } = require("googleapis");
const minimist = require('minimist');
const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;

const infos = require("./secrets/infos.json");
const setLists = require("./secrets/setLists.json");
const msgList_en = require("./secrets/msgList_en.json");
const msgList_bg = require("./secrets/msgList_bg.json");
const documentId = infos.testDocsID;

const helpMsg = `
User1's Commands: \`\`\`%${setLists.set1.join(", %")}\`\`\`
User2's Commands: \`\`\`%${setLists.set2.join(", %")}\`\`\`
User3's Commands: \`\`\`%${setLists.set3.join(", %")}\`\`\`
User4's Commands: \`\`\`%${setLists.set4.join(", %")}\`\`\`
Other Commands: \`\`\`%${setLists.set5.join(", %")}\`\`\``;
const helpMsg_bg = `
Командите на User1: \`\`\`%${setLists.set1.join(", %")}\`\`\`
Командите на User2: \`\`\`%${setLists.set2.join(", %")}\`\`\`
Командите на User3: \`\`\`%${setLists.set3.join(", %")}\`\`\`
Командите на User4: \`\`\`%${setLists.set4.join(", %")}\`\`\`
Други команди: \`\`\`%${setLists.set5.join(", %")}\`\`\``;
const initMsg = msgList_en.initMsg;
const helpCmdMsg = msgList_en.helpCmdMsg;
const helpPauseMsg = msgList_en.helpPauseMsg;
const helpSayMsg = msgList_en.helpSayMsg;
const unknownCmdMsg = msgList_en.unknownCmdMsg;
const initMsg_bg = msgList_bg.initMsg;
const helpCmdMsg_bg = msgList_bg.helpCmdMsg;
const helpPauseMsg_bg = msgList_bg.helpPauseMsg;
const helpSayMsg_bg = msgList_bg.helpSayMsg;
const unknownCmdMsg_bg = msgList_bg.unknownCmdMsg;

// const ChannelID = infos.channelID;
const testChannelID = infos.testChannelID;
// const testChannelID2 = infos.testChannelID2;

const TOKEN_DISCORD = infos.discordToken;
const auth = new google.auth.GoogleAuth({
	keyFile: "./secrets/credentials.json",
	scopes: "https://googleapis.com/auth/documents",
});

const nodeArgs = minimist(process.argv.slice(2));
console.log(nodeArgs);

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "%";
client.login(TOKEN_DISCORD);
client.isPaused = false;

client.on("messageCreate", async function(msg) {
  if (msg.author.bot) {return;}
	if (nodeArgs.g) {
    const googleClient = await auth.getClient();
		const googleDocs = google.docs({ version: "v1", auth: googleClient });
		const metadata = await googleDocs.documents.get({
      auth,
			documentId,
		});
		console.log(metadata.data);
	}
	// if (msg.channelId !== testChannelID) {return;}
	if (!msg.content.includes(prefix)) {return;}
	const args = msg.content.slice(prefix.length).split(" ");
	const command = args.shift().toLowerCase();

  if (command === "unpause") {
    if (!client.isPaused) {
      return msg.channel.send("The bot is already listening to commands.");
    }
    client.isPaused = false;
    return msg.channel.send("The bot is listening to your commands again.");
  }
  if (client.isPaused) {
    return msg.channel.send({ files: ["https://img-comment-fun.9cache.com/media/ajAGPnw/akmoGz75_700w_0.jpg"] });
  }

	switch (command) {
  case "pause":
    client.isPaused = true;
    return msg.channel.send("The bot is paused, use %unpause to unpause it.");
	case "ping":
		return msg.channel.send("Pong!");
	case "пинг":
		return msg.channel.send("Понг!");
	case "say": case "кажи":
		console.log(args);
		return msg.channel.send(args.join(" "));
	// case msgList.set1:
	// 	return msg.channel.send("user1");
	// case msgList.set2:
	// 	return msg.channel.send("user2");
	// case msgList.set3:
	// 	return msg.channel.send("user3");
	// case msgList.set4:
	// 	return msg.channel.send("user4");
	// case msgList.set5:
	// 	return msg.channel.send("other");
	case "help": case "h":
		switch (args[0]) {
    case "say": case "%say": case "кажи": case "%кажи":
			return msg.channel.send(helpSayMsg);
		case "ping": case "%ping": case "пинг": case "%пинг":
			return msg.channel.send("Ping-pong, I guess.");
		case "help": case "h": case "%помощ": case "%п":
			return msg.channel.send(helpCmdMsg);
    case "pause": case "%pause":
      return msg.channel.send(helpPauseMsg);
		// case msgList.set1:
		// 	return msg.channel.send("enter a тъпизъм in the google doc under user1's category");
		// case msgList.set2:
		// 	return msg.channel.send("enter a тъпизъм in the google doc under user2's category");
		// case msgList.set3:
		// 	return msg.channel.send("enter a тъпизъм in the google doc under user3's category");
    // case msgList.set4:
    // 	return msg.channel.send("enter a тъпизъм in the google doc under user4's category");
    // case msgList.set5:
    // 	return msg.channel.send("enter a тъпизъм in the google doc under the "other" category");
		default:
			return msg.channel.send(helpMsg);
		}
  case "помощ": case "п":
    switch (args[0]) {
      case "say": case "%say": case "кажи": case "%кажи":
        return msg.channel.send(helpSayMsg_bg);
      case "ping": case "%ping": case "пинг": case "%пинг":
        return msg.channel.send("Пинг-понг, предполагам.");
      case "help": case "%help": case "h": case "%h": case "помощ": case "%помощ": case "п": case "%п":
        return msg.channel.send(helpCmdMsg_bg);
      case "pause":
        return msg.channel.send(helpPauseMsg_bg);
      // case msgList.set1:
      // 	return msg.channel.send("enter a тъпизъм in the google doc under user1's category");
      // case msgList.set2:
      // 	return msg.channel.send("enter a тъпизъм in the google doc under user2's category");
      // case msgList.set3:
      // 	return msg.channel.send("enter a тъпизъм in the google doc under user3's category");
      // case msgList.set4:
      // 	return msg.channel.send("enter a тъпизъм in the google doc under user4's category");
      // case msgList.set5:
      // 	return msg.channel.send("enter a тъпизъм in the google doc under the "other" category");
      default:
        return msg.channel.send(helpMsg_bg);
      }
	default:
		if (cyrillicPattern.test(msg.content.slice(prefix.length))) {
      return msg.channel.send(unknownCmdMsg_bg);
    }
    return msg.channel.send(unknownCmdMsg);
	}
	// basicReplyWithArgs(msgList.set1, "user1", msg, args, command);
	// basicReplyWithArgs(msgList.set2, "user2", msg, args, command);
	// basicReplyWithArgs(msgList.set3, "user3", msg, args, command);
	// basicReplyWithArgs(msgList.set4, "user4", msg, args, command);
	// basicReplyWithArgs(msgList.set4, "other", msg, args, command);
});

client.once("ready", function() {
	console.log("Logged in as ".concat(client.user.tag, "!"));
	if (nodeArgs.i) {
		if (nodeArgs.b) {
			client.channels.cache.get(testChannelID)
				.send(initMsg_bg);
			return;
		}
		client.channels.cache.get(testChannelID)
			.send(initMsg);
	}
});