const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Displays the current ping to the bot & the Discord API")
        .setDMPermission(false),
	async execute(interaction, client, GLOBALS)
    {
        try
        {
            const message = await interaction.editReply({ content: "Pong!", fetchReply: true, ephemeral: true });

            await interaction.editReply(
            {
                content: `Bot Latency: \`${message.createdTimestamp - interaction.createdTimestamp}ms\`, Websocket Latency: \`${client.ws.ping}ms\``,
                ephemeral: true
            });
        }
        catch (err)
        {
            console.log("Exception caught at /ping => ", err);
        }
	}
}