const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const config = require("./config.json");
const ytdl = require("ytdl-core");
const Eris = require("eris");
const bot = new Eris(config.token);

let commandCounter = 0;

client.on("ready", () => {
	const date = new Date(); // Fri Jun 17 2022 11:27:28 GMT+0100 (British Summer Time)
	let StartupHour = date.getHours();
	let StartupMinutes = date.getMinutes();
	let StartupDay = date.getDate();
	console.log(`Bot has started, with ${client.users.cache.size} users in ${client.channels.cache.size} channels inside ${client.guilds.cache.size} servers.`);
	client.user.setActivity(`Serving ${client.guilds.cache.size} servers | ${commandCounter} commands executed, since day ${StartupDay} at ${StartupHour}:${StartupMinutes}`);
});

client.on("guildCreate", (guild) => {
	console.log(`The bot joined the server: ${guild.name} (id: ${guild.id}). Population: ${guild.memberCount} members!`);
	client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", (guild) => {
	console.log(`The bot has been removed from the server: ${guild.name} (id: ${guild.id}).`);
	client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});
//! Minigames Configuration

//* Random Number

let randomNumber = Math.floor(Math.random() * 100) + 1;
let min = 1;
let max = 100;

//* Random Number

//* Random Word

let words = ["pedro", "discord", "league of legends", "pedro ia", "supremacia dos jogadorers de frifas"];
let randomWord = words[Math.floor(Math.random() * words.length)];
let lettersGuessed = [];
let strikes = 0;

//* Random Word

//! Minigames Configuration
client.on("messageCreate", (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const prefix = config.prefix;

	const args = message.content.slice(prefix.length).split(/ +/);

	const command = args.shift().toLowerCase();

	//! message array

	const messageArray = message.content.split(" ");
	const argument = messageArray.slice(1);
	const cmd = messageArray[0];

	//* COMMANDS

	//! Test Commands

	if (command === "ping") {
		message.channel.send("pong");
		commandCounter++;
	}

	if (command === "info" || command === "informação") {
		message.reply(`Name: ${message.author.username}\n ID: ${message.author.id}\n Created at: ${message.author.createdAt}`);
		commandCounter++;
	}

	if (command === "random" || command === "r") {
		let args = message.content.split(" ");
		let number = args[1];
		if (!number) {
			let prefixNumber = Math.floor(Math.random() * 1000) + 1;
			message.reply(`Random numberr is: ${prefixNumber}`);
		} else {
			let randomNumber = Math.floor(Math.random() * number) + 1;
			message.reply(`Random number is: ${randomNumber}`);
		}
		commandCounter++;
	}

	if (command === "guess") {
		let userGuess = message.content.split(" ")[1];
		if (!userGuess) {
			message.channel.send(`The number is between ${min} and ${max}.`);
		} else if (userGuess < randomNumber) {
			min = userGuess;
			message.channel.send(`Too low! The number is between ${min} and ${max}. Try again`);
		} else if (userGuess > randomNumber) {
			max = userGuess;
			message.channel.send(`Too high! The number is between ${min} and ${max}. Try again`);
		} else {
			message.channel.send(`Correct! The number was ${randomNumber}.`);
			randomNumber = Math.floor(Math.random() * 100) + 1;
			min = 1;
			max = 100;
		}
		commandCounter++;
	}

	if (command === "hangman" || command === "letter" || command === "adivinhar") {
		let userGuess = message.content.split(" ")[1];
		if (!userGuess) {
			message.channel.send(`You have to guess a letter.`);
		} else if (userGuess === "guessword" || userGuess === "adivinhar") {
			let userWordGuess = message.content.split(" ")[2];
			if (userWordGuess === randomWord) {
				message.channel.send(`Correct! The word was ${randomWord}`);
				randomWord = words[Math.floor(Math.random() * words.length)];
				lettersGuessed = [];
				strikes = 0;
			} else {
				message.channel.send(`Incorrect! The word was ${randomWord}`);
				randomWord = words[Math.floor(Math.random() * words.length)];
				lettersGuessed = [];
				strikes = 0;
			}
		} else if (lettersGuessed.includes(userGuess)) {
			message.channel.send(`You already guessed that letter.`);
		} else if (!randomWord.includes(userGuess)) {
			strikes++;
			lettersGuessed.push(userGuess);
			message.channel.send(`Incorrect! ${strikes}/${randomWord.length} strikes. Letters guessed: ${lettersGuessed.join(", ")}`);
		} else {
			lettersGuessed.push(userGuess);
			let wordWithBlanks = randomWord
				.split("")
				.map((letter) => (lettersGuessed.includes(letter) ? letter : "x"))
				.join(" ");
			message.channel.send(`Correct! \n${wordWithBlanks}\n Letters guessed: ${lettersGuessed.join(", ")}`);
		}
		commandCounter++;
	}

	if (command === "leaderboard") {
		message.guild.members.fetch().then((members) => {
			message.guild.members.fetch().then((members) => {
				let membersArray = Array.from(members.values()).map((member) => ({
					tag: member.user.tag,
					timestamp: member.user.createdTimestamp,
				}));
				membersArray.sort((a, b) => a.timestamp - b.timestamp);
				let leaderboard = membersArray.map((member, index) => `${index + 1}. ${member.tag} - ${new Date(member.timestamp).toLocaleDateString()}`);
				let border = "```";
				message.channel.send(`${border}\nLeaderboard:\n${leaderboard.join("\n")}\n${border}`);
				commandCounter++;
			});
		});
	}

	if (command === "me") {
		if (message.content.startsWith(">me")) {
			let args = message.content.slice(4).split("|");
			message.delete();
			args.forEach((text) => message.channel.send(text.trim()));
			commandCounter++;
		}
	}

	if (command === "pedro") {
		message.delete();
		let userID = "296461607549272064";
		let user = client.users.cache.get(userID);
		user.send(`@${message.author.username} is calling you.`);
		message.reply(`I called him, wait for some minutes please.`);
		commandCounter++;
	}

	if (command === "notify" || command === "spam") {
		let targetUser = message.mentions.users.first();
		let messageCount = 1;
		if (!targetUser) {
			return message.reply("Please mention a user to send a notification to.");
		}
		if (args[1]) {
			messageCount = parseInt(args[1]);
			if (messageCount > 10) {
				messageCount = 10;
			}
		}
		for (let i = 0; i < messageCount; i++) {
			targetUser.send(`You have been notified by ${message.author.username}!`);
		}
		message.channel.send(`${messageCount} notifications sent to ${targetUser.username}.`);
		commandCounter++;
	}

	if (command === "companhia" || command === "joinMe" || command === "call") {
		return message.reply("This command is not ready yet ☹️")
		/* if (!message.member.voice.channelID) {
			return message.channel.send("You need to join a voice channel first.");
		}
		let voiceChannelID = message.member.voice.channelID;
		client.channels
			.fetch(voiceChannelID)
			.then((channel) => channel.join())
			.then((connection) => {
				// Do something with the connection
				message.channel.send("Calling you now");
			})
			.catch(console.error); */
	}

	if (command === "play" || command === "music" || command === "listen") {
		return message.reply("This command is not ready yet ☹️")
		/* if (args[0].startsWith("https://www.youtube.com")) {
			let link = args[0];
			let voiceChannel = message.member.voice.channel;
			console.log(voiceChannel);
			if (!voiceChannel) {
				return message.reply("You must be in a voice channel to play music!");
			}

			voiceChannel
				.join()
				.then((connection) => {
					console.log("Connected!");
					const stream = ytdl(link, { filter: "audioonly" });
					const dispatcher = connection.play(stream);
				})
				.catch(console.error);
		} */
	}
	//const { MessageEmbed } = require("discord.js");

	if (command === "vote") {
		return message.reply("This command is not ready yet ☹️")
		/* const options = args.slice(0, 5); // limit to 5 options
		if (options.length === 0) {
			return message.reply("Please provide at least one option to vote on.");
		}

		// create an embed to display the options
		const embed = new MessageEmbed().setTitle("Vote").setDescription(options.map((o, i) => `${i + 1}. ${o}`).join("\n"));

		// send the embed
		message.channel.send(embed).then(async (msg) => {
			// add reactions
			const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]; // digits as emojis
			for (let i = 0; i < options.length; i++) {
				await msg.react(emojis[i]);
			}
		}); */
	}

	client.user.setActivity(`Serving ${client.guilds.cache.size} servers | ${commandCounter} commands executed`);
});

bot.on("voiceChannelLeave", () => {
	bot.leaveVoiceChannel();
});

client.login(config.token);
