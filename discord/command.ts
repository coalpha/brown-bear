import CommandFn from "./CommandFn";

const commandList: { [command: string]: CommandFn } = Object.create(null);

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
   const pLine = parseLine(line);
   if (pLine === null) {
      return null;
   }

   const commandToRun = commandList[pLine.name];
   if (commandToRun === undefined) {
      return null;
   }

   return commandToRun(pLine.args);
}
