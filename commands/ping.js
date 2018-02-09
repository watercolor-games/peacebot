exports.run = (client, message, args) => {
    message.channel.send("Richie Moch is REALLY hot.");
};
exports.help = {
    name: 'ping',
    category: "Core",
    notes: 'Checks if the bot is online.',
    args: 'none'
};