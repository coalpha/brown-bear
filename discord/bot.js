const Eris = require("eris");

const config = require("./config");

/** @type {import("eris").Client} */
const bot = new Eris(config.bot.token);

bot.on("ready", () => {
   console.log("I'm a speed junkie...");
   const guilds = bot.guilds.forEach(guild => {
      console.log(guild.name);
   });
});

/**
 * @param {import("eris").Message} msg
 * @returns {boolean}
 */
function messageIsFromSelf(msg) {
   return msg.author.id === config.client.id;
}

bot.on("messageCreate", msg => {
   if (messageIsFromSelf(msg)) {
      // ignore
   } else {
      console.log(msg);
      bot.createMessage(msg.channel.id, "Pong!");
   }
});

bot.connect();
