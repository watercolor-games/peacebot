exports.run = (client, message, args) => {
    const config = require('../config.json');
    const Discord = require ("discord.js");
    let categories = [];
    let commands = Array.from(client.commands.keys());
    let embed = new Discord.RichEmbed()
        .setTitle('Peacenet AI command help')
        .setDescription('Below is a list of commands you can use for this bot. Thanks to Richard Moch for the code.')
        .setColor('YELLOW')
    commands.forEach(command => {
        if(!categories.includes(client.commands.get(command).help.category))
        {
            categories.push(client.commands.get(command).help.category);
        }
    });
    categories.forEach(category => {
        let cat = "";
        commands.forEach(command => {
            if(client.commands.get(command).help.category == category)
            {
                cat += command + "\n";
            }
        });
        embed.addField(category, cat);
    });
    embed.setFooter(`Peacenet AI ${config.version}`);
    message.channel.send({embed});
};
exports.help = {
    name: 'help',
    category: "Core",
    notes: 'Lists all available commands.',
    args: 'none'
};