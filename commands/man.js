exports.run = (client, message, args) => {
    if (!args[0]) {
        return message.reply("You are missing an argument - please send a command name as an argument!");
    }

    let command = client.commands.get(args[0]);
    if (!command) {
        return message.reply("That command doesn't exist.");
    }

    const Discord = require('discord.js');
    var embed = new Discord.RichEmbed();
    embed.setTitle(`Command help for ${command.help.name}`);
    embed.addField("Summary", command.help.notes);
    embed.addField("Syntax", command.help.args);
    embed.addField("Category", command.help.category);
    embed.setColor("GREEN");
    message.channel.send(embed);
};
exports.help = {
    name: "man",
    notes: "Gets help for an individual command.",
    args: "<command>",
    category: "Core"
}