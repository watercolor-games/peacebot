This bot is not meant to be clean or elegant or have a single purpose. It's my way of learning JavaScript. So please don't judge my coding style. Thank you.

### Setting up the bot

Create a new Discord OAuth2 app, and make sure it has a bot token assigned to it.

Then, clone this repo and run:

```bash
npm install discord.js --save
npm install pm2 -g
```

Then, create a file in the root of the repository called `config.json`. Inside, put:

```JSON
{
  version: "v0.1",
  prefix: "pn:",
  token: "Your token here."
}
```

Then, run:

```bash
pm2 start bot.js
```

to run the bot in the background. You can use `pm2 logs` to see the bot's debug status. Use `pm2 restart bot.js` to restart and `pm2 stop bot.js` to stop it.

When you invite the bot to your server, use `pn:help` to see a list of all commands you can run. Use `pn:man <commandname>` to view syntax and notes about a command. Each command is a separate JavaScript file in the `./commands` folder. You can edit a file in there to change the behavior of a command. Use `pn:reload <command>` to reload the command once you've saved.