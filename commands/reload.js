exports.run = async (client, message, args) => {
    let command;
    if (message.author.id == 228271067821506560 || message.author.id == 345678280713699328) {
        if (client.commands.has(args[0])) {
            command = args[0];
        }
        if (!command) return message.channel.send(`The module \`${args[0]}\` could not be found.`)
        try {
            delete require.cache[require.resolve(`./${command}`)];
            let cmd = require(`./${command}`);
            client.commands.delete(command);
            client.commands.set(command, cmd);
            message.reply(`Command reloaded successfully.`)
        } catch (e) {
            message.channel.send('An error has occured while reloading this module. The error has been logged to the console.');
            console.log(e);
        }
    }
    
}
exports.help = {
    name: "reload",
    args: "[./filename.js]",
    notes: "Restarts a specified command.",
    category: 'Cuties only'
}