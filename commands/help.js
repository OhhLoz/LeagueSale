const { SlashCommandBuilder, MessageEmbed } = require("discord.js");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Lists all bot commands")
        .setDMPermission(false),
    async execute(interaction, client, GLOBALS)
    {
        var embed = new MessageEmbed()
        .setTitle("Help")
        .setColor(0xff8d00)
        .setTimestamp()
        .setFooter({text: GLOBALS.footerText, iconURL: GLOBALS.leagueIMG})
        .addFields
        (
            {name: "\u200b", value: `${GLOBALS.titleSpacer}**Bot Commands**`},
            {name: "/help", value: "Lists all current commands"},
            {name: "/ping", value: "Displays the current ping to the bot & the Discord API"},
            {name: "/stats", value: "Displays bot statistics, invite link and contact information"}
        )

        interaction.editReply
        ({
            embeds: [embed],
            ephemeral: true
        })
	}
}