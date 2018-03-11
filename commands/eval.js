exports.run = async (client, message, args) => {
    const Discord = require('discord.js');
    if (message.author.id == "345678280713699328") {
        exports.error = "**🚫 ERROR** "
        exports.fgRed = "\x1b[1m\x1b[31m"
        exports.reset = "\x1b[0m"
        try {
            const code = args.join(" ");
            const clean = text => {
                if (typeof (text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
            }
            let evaled = Function(code)();

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            let embed = new Discord.RichEmbed()
                .setAuthor("Evaluation result")
                .setDescription("Here's the result of the code you just run.")
                .addField("Code", `\`\`\`js\n${code}\n\`\`\``)
                .addField("Result", `\`\`\`js\n${clean(evaled)}\n\`\`\``)
                .setColor(255, 0, 255);
            message.channel.send({ embed });
        } catch (err) {
            message.channel.send(module.exports.error + err)
            console.log(exports.fgRed + "[X] Error caught: " + err + module.exports.reset)
        }
    } else {
        message.channel.send(exports.error + "Insufficient permissions.")
    }
}

module.exports.help = {
    name: "eval",
    args: "<code>",
    notes: "Executes JavaScript code. Command written by the lovely Richie Moch.",
    category: 'Riolu Only'
}
