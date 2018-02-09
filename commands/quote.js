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
    let json = fs.readFileSync('./quotes.json');
    let quotesToChoose = JSON.parse(json);
    let quoteIndexChosen = Math.floor(Math.random() * quotesToChoose.length);
    let quote = quotesToChoose[quoteIndexChosen];
    let quoteUser = client.users.get(quote.user);
    embed.setTitle(`Here's your quote! Message author: ${quoteUser.tag}`)
        .setDescription(quote.content)
        .setColor('GREEN')
        .setThumbnail(quoteUser.avatarURL)
        .setFooter(`Message created on ${quote.timestamp} | Message ID: ${quote.id}`)
    message.channel.send({ embed });
};