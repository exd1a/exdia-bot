/* eslint-disable indent */
// const fs = require('fs');
const Discord = require('discord.js');
const { google } = require("googleapis");
const minimist = require('minimist');
const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;

const infos = require("./secrets/infos.json");
const setLists = require("./secrets/setLists.json");
const msgList_en = require("./locale/msgList_en.json");
const msgList_bg = require("./locale/msgList_bg.json");
const documentId = infos.testDocsID;

function HelpMsg(lang) {
	let helpMsg = 0;
	let msgList;
	switch (lang) {
		case "bg":
			msgList = msgList_bg;
			break;
		case "en":
		default:
			msgList = msgList_en;
			break;
	}
	Object.keys(setLists).forEach(element => {
		if (element === "other") {
			helpMsg += `${msgList.helpMsgOther}: \`\`\`%${setLists[element].join(" %")}\`\`\`\n`;
		}
		else {
			helpMsg += `${msgList.helpMsgUserBefore}${element.charAt(0).toUpperCase() + element.slice(1)}${msgList.helpMsgUserAfter}: \`\`\`%${setLists[element].join(" %")}\`\`\`\n`;
		}
	});
	return helpMsg.slice(1);
}
function InitMsg(lang) {
  switch (lang) {
    case "bg":
      return msgList_bg.initMsg;
    case "en":
    default:
      return msgList_en.initMsg;
  }
}
function HelpCmdMsg(lang) {
  switch (lang) {
    case "bg":
      return msgList_bg.helpCmdMsg;
    case "en":
    default:
      return msgList_en.helpCmdMsg;
  }
}
function HelpPauseMsg(lang) {
  switch (lang) {
    case "bg":
      return msgList_bg.helpPauseMsg;
    case "en":
    default:
      return msgList_en.helpPauseMsg;
  }
}
function HelpSayMsg(lang) {
  switch (lang) {
    case "bg":
      return msgList_bg.helpSayMsg;
    case "en":
    default:
      return msgList_en.helpSayMsg;
  }
}
function UnknownCmdMsg(lang) {
  switch (lang) {
    case "bg":
      return msgList_bg.unknownCmdMsg;
    case "en":
    default:
      return msgList_en.unknownCmdMsg;
  }
}

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
    case "добави":
      console.log("cool");
      break;
    case "add":
      if (args.length === 0) {return msg.channel.send("bruh");}
      setLists.user1.forEach(element => {
        if (args[0] === element) {return msg.channel.send(`nice ${element}`);}
      });
      setLists.user2.forEach(element => {
        if (args[0] === element) {return msg.channel.send(`nice ${element}`);}
      });
      setLists.user3.forEach(element => {
        if (args[0] === element) {return msg.channel.send(`nice ${element}`);}
      });
      setLists.user4.forEach(element => {
        if (args[0] === element) {return msg.channel.send(`nice ${element}`);}
      });
      setLists.other.forEach(element => {
        if (args[0] === element) {return msg.channel.send(`nice ${element}`);}
      });
      if (args.length === 1) {return msg.channel.send("actual bruh moment");}
      if (args.length > 1) {return msg.channel.send(args.join(" "));}
      break;
    // case msgList.user1:
    // 	return msg.channel.send("user1");
    // case msgList.user2:
    // 	return msg.channel.send("user2");
    // case msgList.user3:
    // 	return msg.channel.send("user3");
    // case msgList.user4:
    // 	return msg.channel.send("user4");
    // case msgList.other:
    // 	return msg.channel.send("other");
    case "help": case "h":
      switch (args[0]) {
        case "say": case "%say": case "кажи": case "%кажи":
          return msg.channel.send(HelpSayMsg());
        case "ping": case "%ping": case "пинг": case "%пинг":
          return msg.channel.send("Ping-pong, I guess.");
        case "help": case "h": case "%помощ": case "%п":
          return msg.channel.send(HelpCmdMsg());
        case "pause": case "%pause":
          return msg.channel.send(HelpPauseMsg());
          // case msgList.user1:
          // 	return msg.channel.send("enter a тъпизъм in the google doc under user1's category");
          // case msgList.user2:
          // 	return msg.channel.send("enter a тъпизъм in the google doc under user2's category");
          // case msgList.user3:
          // 	return msg.channel.send("enter a тъпизъм in the google doc under user3's category");
          // case msgList.user4:
          // 	return msg.channel.send("enter a тъпизъм in the google doc under user4's category");
          // case msgList.other:
          // 	return msg.channel.send("enter a тъпизъм in the google doc under the "other" category");
        case "bg":
          return msg.channel.send(HelpMsg("bg"));
        default:
          return msg.channel.send(HelpMsg());
      }
    case "помощ": case "п":
      switch (args[0]) {
        case "say": case "%say": case "кажи": case "%кажи":
          return msg.channel.send(HelpSayMsg("bg"));
        case "ping": case "%ping": case "пинг": case "%пинг":
          return msg.channel.send("Пинг-понг, предполагам.");
        case "help": case "%help": case "h": case "%h": case "помощ": case "%помощ": case "п": case "%п":
          return msg.channel.send(HelpCmdMsg("bg"));
        case "pause":
          return msg.channel.send(HelpPauseMsg("bg"));
        // case msgList.user1:
        //   return msg.channel.send("enter a тъпизъм in the google doc under user1's category");
        // case msgList.user2:
        //   return msg.channel.send("enter a тъпизъм in the google doc under user2's category");
        // case msgList.user3:
        //   return msg.channel.send("enter a тъпизъм in the google doc under user3's category");
        // case msgList.user4:
        //   return msg.channel.send("enter a тъпизъм in the google doc under user4's category");
        // case msgList.other:
        //   return msg.channel.send('enter a тъпизъм in the google doc under the "other" category');
        default:
          return msg.channel.send(HelpMsg("bg"));
      }
    default:
      if (cyrillicPattern.test(msg.content.slice(prefix.length))) {
        return msg.channel.send(UnknownCmdMsg("bg"));
      }
      return msg.channel.send(UnknownCmdMsg());
	}
});

client.once("ready", function() {
	console.log("Logged in as ".concat(client.user.tag, "!"));
	if (nodeArgs.i) {
		if (nodeArgs.b) {
			client.channels.cache.get(testChannelID)
				.send(InitMsg("bg"));
			return;
		}
		client.channels.cache.get(testChannelID)
			.send(InitMsg());
	}
});