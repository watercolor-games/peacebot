exports.run = (client, message, args) => {
    message.channel.send("[**system status:** nominal]");
};
exports.help = {
    name: 'ping',
    category: "Core",
    notes: 'Checks if the bot is online.',
    args: 'none'
};