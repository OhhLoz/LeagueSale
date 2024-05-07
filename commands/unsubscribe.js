const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("unsubscribe")
		.setDescription("Unsubscribes the current channel to new sale updates")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client, GLOBALS)
    {
	}
}