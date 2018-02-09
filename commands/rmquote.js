const fs = require("fs");
const Discord = require('discord.js');

exports.help = {
    name: "rmquote",
    notes: "Removes a quote from the quote database.",
    args: "<messageid>",
    category: "Riolu Only",
};
exports.run = (client, message, args) =>
{
    if(message.author.id != "345678280713699328") {
        return message.reply("Insufficient permission.");
    }
    if(!args[0])
        return message.reply("You must specify a message ID.");
    let messageid = args[0];
    if(!fs.existsSync("./quotes.json"))
    {
        fs.writeFileSync("./quotes.json", "[]");
    }
    var json = fs.readFileSync("./quotes.json");
    var db = JSON.parse(json);
    let index = -1;
    var quote = db.find((value, i, obj) => {
        index = i;
        return value.id == messageid;
    });
    if(!quote)
    {
        return message.reply("That quote isn't in the database.");
    }
    db.splice(index, 1);
    json = JSON.stringify(db);
    fs.writeFileSync("./quotes.json", json);
    let quoteUser = client.users.get(quote.user);
    var embed = new Discord.RichEmbed();
    embed.setTitle(`Message by ${quoteUser.tag} removed from quote database successfully.`);
    embed.setColor("RED");
    embed.setThumbnail(quoteUser.avatarURL);
    embed.setDescription(quote.content);
    embed.setFooter(`Posted on ${quote.timestamp} | Message ID: ${messageid}`);
    message.channel.send(embed);

};