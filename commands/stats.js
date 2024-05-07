const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getTime } = require("../functions.js");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("stats")
		.setDescription("Displays bot statistics, invite link and contact information")
        .setDMPermission(false),
    async execute(interaction, client, GLOBALS)
    {
        var embed = new EmbedBuilder()
        .setTitle("Bot Stats")
        .setColor(0xff8d00)
        .setTimestamp()
        .setThumbnail(GLOBALS.leagueIMG)
        .setFooter({text: GLOBALS.footerText, iconURL: GLOBALS.leagueIMG})
        .addFields
        (
            {name: "User Count", value: GLOBALS.counts.usercount.toString(), inline:true},
            {name: "Server Count", value: GLOBALS.counts.servercount.toString(), inline:true},
            {name: "Channel Count", value: GLOBALS.counts.channelcount.toString(), inline:true},
            {name: "Version", value: GLOBALS.version.toString(), inline:true},
            {name: "Uptime", value: getTime(client.uptime), inline:true},
            //{name: "Invite Link", value: `[Invite](${GLOBALS.links.invite})`, inline:true},
            {name: "Development Link", value: `[GitHub](${GLOBALS.links.repo})`, inline:true},
            {name: "Support Link", value: `[Discord](${GLOBALS.links.server})`, inline:true},
            {name: "Bot Page", value: `[TopGG](${GLOBALS.links.topgg})`, inline:true},
            {name: "Donate", value: `[Ko-Fi](${GLOBALS.links.donate})`, inline:true}
        )

        interaction.editReply
        ({
            embeds: [embed],
            ephemeral: false
        })
	}
}