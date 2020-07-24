import Eris = require("eris");
import config = require("./config");

type Message = Eris.Message;

const bot = Eris(config.bot.token);

bot.on("ready", () => {
   console.log("I'm a speed junkie...");
   const guilds = bot.guilds.forEach(guild => {
      console.log(guild.name);
   });
   bot.editStatus("online", { name: "your server messages", type: 3 });
});

function messageIsFromSelf(msg: Message) {
   return msg.author.id === config.client.id;
}

const commandPrefix = "!";

const commands = require("./command");

const messageCauseEffect = {};

async function newHandleMessage(msg: Message) {
   if (!messageIsFromSelf(msg)) {
      const { content } = msg;
      if (content[0] === commandPrefix) {
         const command = content.slice(1, content.indexOf(" "));
         const rest = content.slice(content.indexOf(" "));
         if (command in commands) {
            console.log("it worked ");
            const sentMsg = await bot.createMessage(msg.channel.id, commands[command](rest));
            messageCauseEffect[msg.id] = sentMsg;
         }
      }
   }
}

bot.on("messageCreate", newHandleMessage);

const fiveSeconds = 5 * 1000;
bot.on("messageUpdate", msg => {
   if (!messageIsFromSelf(msg)) {
      if (msg.editedTimestamp < (msg.timestamp + fiveSeconds)) {
         if (messageCauseEffect.hasOwnProperty(msg.id)) {
            const { content } = msg;
            if (content[0] === commandPrefix) {
               const command = content.slice(1, content.indexOf(" "));
               const rest = content.slice(content.indexOf(" "));
               if (command in commands) {
                  console.log("updating message");
                  /** @type {Message} */
                  const oldMessage = messageCauseEffect[msg.id];
                  oldMessage.edit(commands[command](rest));
               }
            }
         } else {
            newHandleMessage(msg);
         }
      }
   }
});

bot.connect();
