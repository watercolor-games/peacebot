const readl = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readl.createInterface({
  input: process.stdin,
  output: process.stdout
});

let o = {
};

function readline(question, defaultAnswer){
  return new Promise((resolve, reject) => {
    rl.question(`${question} (${defaultAnswer || "required"}): `, (answer/*, err*/) => {
      // if(err) reject(err);
      resolve(answer || defaultAnswer);
    });
  });
}

async function ask(){
  o.version = await readline("Version", "v0.1");
  o.prefix = await readline("Prefix", "pn:");
  o.token = await readline("Bot token");
  rl.close();
  fs.writeFileSync(path.join(__dirname, "/config.json"), JSON.stringify(o));
}

ask();
