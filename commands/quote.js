exports.help = {
    name: 'quote',
    notes: 'Gets a quote said by a person. **This command is global.**',
    args: 'none',
    category: 'Quote of the Day'
};
exports.run = (client, message, args) => {
    const fs = require('fs');
    const Discord = require('discord.js');
    let embed = new Discord.RichEmbed();
    if (!fs.existsSync('./quotes.json')) return message.channel.send("There is no database to grab information off of.");
    fs.readFileSync('./quotes.json', (err, content) => {
        if (err) console.error(err);
        let quotesToChoose = JSON.parse(content);
        let quoteIndexChosen = Math.floor(Math.random() * quotesToChoose.content.length);
        embed.setTitle(`Quote of the Day! Message author: ${client.users.get(quotesToChoose.user[quoteIndexChosen]).user.tag}`)
            .setDescription(quotesToChoose.content[quoteIndexChosen])
            .setColor('GREEN')
            .setThumbnail(client.users.get(quotesToChoose.user[quoteIndexChosen]).avatarURL)
            .setFooter(`Message created on ${quotesToChoose.timestamp[quoteIndexChosen]} | Message ID: ${quotesToChoose.id[quoteIndexChosen]}`)
        message.channel.send({ embed });
    });
};