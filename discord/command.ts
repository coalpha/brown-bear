import CommandFn = require("./CommandFn");

const commandList: { [command: string]: CommandFn } = Object.create(null);

import serious = require("./commands/serious");
import zalgo = require("./commands/zalgo");

commandList.serious = serious;
commandList.zalgo = zalgo;

const commandPrefix = '!';

interface Line {
   name: string,
   args: string[],
}

function parseLine(line: string): Line | null {
   if (line[0] !== commandPrefix) {
      return null;
   }

   const [name, ...args] = line.slice(1).split(" ");
   if (name === undefined) {
      return null;
   }

   return { name, args };
}

export = function runCommand(line: string): string | null {
   const pline = parseLine(line);
   if (pline === null) {
      return null;
   }

   const commandToRun = commandList[pline.name];
   if (commandToRun === undefined) {
      return null;
   }
   return commandToRun(pline.args);
}
