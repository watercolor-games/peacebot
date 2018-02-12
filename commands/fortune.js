const request = require('request');

exports.help = {
    name: "fortune",
    notes: "Display a random, hopefully interesting fortune.",
    args: "none",
    category: "Fun"
};
exports.run = (client, message, args)=>{
    request("https://helloacm.com/api/fortune/", {json:true}, (err, res, body) =>{
        if(err)
        {
            console.error(err);
            return message.reply("An error has occurred fetching your fortune. Error logged to console.");
        }
        message.reply(body);
        
    });
};