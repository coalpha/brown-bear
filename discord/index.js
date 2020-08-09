const Eris = require("eris");
const config = require("./config");
const runCommand = require("./command");

const bot = Eris(config.bot.token);

bot.on("ready", () => {
   console.log("I'm a speed junkie...");
   bot.editStatus("online", { name: "your server messages", type: 3 });
});

function messageIsFromSelf(msg) {
   return msg.author.id === config.client.id;
}

const messageCauseEffect = {};

const fiveSeconds = 5 * 1000;

bot.on("messageCreate", async msg => {
   if (messageIsFromSelf(msg)) {
      return;
   }

   const commandOutput = runCommand(msg.content);
   if (commandOutput === null) {
      return;
   }

   const sentMsg = await bot.createMessage(msg.channel.id, commandOutput);
   messageCauseEffect[msg.id] = sentMsg;
   setTimeout(() => {
      delete messageCauseEffect[msg.id];
   }, fiveSeconds);
});

bot.on("messageUpdate", msg => {
   if (messageIsFromSelf(msg)) {
      return;
   }

   if (msg.editedTimestamp === undefined) {
      return;
   }

   const fiveSecondsLater = msg.timestamp + fiveSeconds; // this may be redundant
   if (msg.editedTimestamp > fiveSecondsLater) {
      return;
   }

   const commandOutput = runCommand(msg.content);
   if (commandOutput === null) {
      return;
   }

   const oldMessage = messageCauseEffect[msg.id];
   if (oldMessage === undefined) {
      return;
   }

   oldMessage.edit(commandOutput);
});

bot.connect();
