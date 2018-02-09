const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let modules = files.filter(f => f.split(".").pop() === "js");
    if (modules.length <= 0) {
        console.log("No public commands found. Running with no public commands loaded.");
        return;
    }

    console.log(`Now loading ${modules.length} public commands.`)
    modules.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        try {
            client.commands.set(props.help.name, props);
        } catch (err) {
            console.log('One or more of your public commands caused an error. Check your public commands and try again. \n=> ' + err.stack);
            process.exit(1)
        }
    })

    console.log(`Finished loading all ${modules.length} commands.`)
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}.`);
    client.user.setGame("with Richie");
});

client.on('message', message => {
    if(message.author.bot) {
        return;
    }

    if(message.channel.type === "dm")
    {
        return;
    }
    
    const prefix = config.prefix;

    let array = message.content.split(" ");

    let command = array[0].slice(prefix.length);

    if(!message.content.startsWith(prefix))
    {
        return;
    }

    let args = array.slice(1);

    let cmd = client.commands.get(command);
    if(!cmd)
    {
        return;
    }
    try{
        cmd.run(client, message, args);
    }
    catch(e)
    {
        var embed = new Discord.RichEmbed();
        embed.setTitle("Fatal error running command.");
        embed.setDescription("A fatal error has occurred while processing/running that command. Apologies.");
        embed.setFooter("Exception logged to console | We'll keep on truckin'.");
        message.channel.send(embed);
        console.error(e);
    }
});


client.login(config.token);