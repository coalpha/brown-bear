const serious = require("./commands/serious");
const zalgo = require("./commands/zalgo");
const brownbear = require("./commands/gar1t");

const commandList = {
   serious,
   zalgo,
   brownbear,
};

const commandPrefix = "!";

/**
 * @param {string} line
 * @returns {?any}
 */
function parseLine(line) {
   if (line[0] !== commandPrefix) {
      return null;
   }

   const [name, ...args] = line.slice(1).split(" ");
   if (name === undefined) {
      return null;
   }

   return { name, args };
}

/**
 * @param {string} line
 * @returns {?string}
 */
module.exports = function runCommand(line) {
   const argv = parseLine(line);
   if (argv === null) {
      return null;
   }

   const commandToRun = commandList[argv.name];
   if (commandToRun === undefined) {
      return null;
   }
   return commandToRun(argv.args);
};
