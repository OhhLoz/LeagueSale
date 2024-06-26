//    LIBRARIES & FUNCTIONS
const { Client, Collection, EmbedBuilder, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions
  ],
});
const { checkCounts } = require("./functions.js");
const fs = require("fs");
// const ytnotifier = require('youtube-notifier');

var TESTING = true;

//    DATA IMPORT
const package = require("./package.json");

if(TESTING)
{
  const testConfig = require('./config.json');
  process.env.BOT_TOKEN = testConfig.BOT_TOKEN;
}

//    GLOBAL VARIABLES
var GLOBALS =
{
  counts:
  {
    servercount: 0,
    usercount: 0,
    channelcount: 0,
  },
  version: package.version,
  titleSpacer: "\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800",
  leagueIMG: "",
  footerText: "Sent by LeagueSalesBot",
  IDs:
  {
    topggServerGuildID: "264445053596991498",
    devServerGuildID: "1236376882648191006",
    leagueSkinsChannelID: "UCC51gGlPcbhs6tceufvOLOQ",
  },
  links:
  {
    repo: "https://github.com/OhhLoz/LeagueSalesBot",
    invite: "https://discord.com/oauth2/authorize?client_id=1236368770805530685",
    donate: "https://ko-fi.com/ohhloz",
    topgg: "",
    server: "https://discord.gg/XBxqTJpGw8"
  }
}

// const Notifier = new ytnotifier({
//   channels: [GLOBALS.IDs.leagueSkinsChannelID],
//   checkInterval: 50
// });

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commandsArr = [];

client.commands = new Collection();

for (const file of commandFiles)
{
	const command = require(`./commands/${file}`);
	commandsArr.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

console.log(`Loaded ${commandsArr.length} commands`);

client.on("ready", async () =>
{
  //  STATISTICS GATHERING
  client.guilds.cache.forEach((guild) =>
  {
    if (guild.id == GLOBALS.IDs.topggServerGuildID || guild.id == GLOBALS.IDs.devServerGuildID)
      return;
    GLOBALS.counts = checkCounts(guild, GLOBALS.counts, true);
  })

  GLOBALS.leagueIMG = client.user.displayAvatarURL();

  const guild = client.guilds.cache.get(GLOBALS.IDs.devServerGuildID); //development server guildID
  //const guild = await client.guilds.fetch(GLOBALS.devServerGuildID); //development server guildID

  if(TESTING)
    guild.commands.set(commandsArr);
  else
    client.commands.set(commandsArr);

  console.log(`LeagueSalesBot v${GLOBALS.version} is currently serving ${GLOBALS.counts.usercount} users, in ${GLOBALS.counts.channelcount} channels of ${GLOBALS.counts.servercount} servers.`);
  client.user.setActivity(`${GLOBALS.counts.servercount} servers | /help`, { type: 'WATCHING' });
});

// Notifier.on('video', async video => {
//   console.log(video);
//   /*
//   video = {
//       channelName,
//       title,
//       publishDate,
//       url,
//       id
//   };
//   */
// });

client.on("guildCreate", guild =>
{
  GLOBALS.counts = checkCounts(guild, GLOBALS.counts, true);
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members! Guild Count:${GLOBALS.counts.servercount}`);
  client.user.setActivity(`${GLOBALS.counts.servercount} servers | /help`, { type: 'WATCHING' });
});

client.on("guildDelete", guild =>
{
  GLOBALS.counts = checkCounts(guild, GLOBALS.counts, false);
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id}). This guild had ${guild.memberCount} members! Guild Count:${GLOBALS.counts.servercount}`);
  client.user.setActivity(`${GLOBALS.counts.servercount} servers | /help`, { type: 'WATCHING' });
});

client.on("interactionCreate", async (interaction) =>
{
  if (!interaction.isCommand())
    return;

  const command = client.commands.get(interaction.commandName);

  if (!command)
    return;

  try
  {
    await interaction.deferReply();
    await command.execute(interaction, client, GLOBALS);
  }
  catch(err)
  {
    console.log("\n\nEntered root command error state\n\n");
    if (err)
      console.log(err);

    var embed = new EmbedBuilder()
    .setTitle("Error Occurred")
    .setColor(0x00AE86)
    .setTimestamp()
    .setFooter({text: GLOBALS.footerText, iconURL: GLOBALS.leagueIMG})
    .setDescription(`An error occurred whilst executing slash command.`);
    await interaction.reply({ embeds: [embed] });
  }
})

client.login(process.env.BOT_TOKEN);