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

const oneSecond = 1000;

const updateTime = oneSecond * 8;
const deleteTime = oneSecond * 15;

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
   }, deleteTime);
});

bot.on("messageUpdate", msg => {
   if (messageIsFromSelf(msg)) {
      return;
   }

   if (msg.editedTimestamp === undefined) {
      return;
   }

   const oldMessage = messageCauseEffect[msg.id];
   if (oldMessage === undefined) {
      return;
   }

   const updateTimeLater = msg.timestamp + updateTime; // this may be redundant
   if (msg.editedTimestamp > updateTimeLater) {
      return;
   }

   const commandOutput = runCommand(msg.content);
   if (commandOutput === null) {
      oldMessage.edit(":disapproval:");
   } else {
      oldMessage.edit(commandOutput);
   }
});

bot.on("messageDelete", msg => {
   const deleteTime = Date.now();

   if (!msg.author || messageIsFromSelf(msg)) {
      return;
   }

   const oldMessage = messageCauseEffect[msg.id];
   if (oldMessage === undefined) {
      return;
   }

   const deleteTimeLater = msg.timestamp + deleteTime;
   if (deleteTime > deleteTimeLater) {
      return;
   }

   oldMessage.delete();
});

bot.connect();
