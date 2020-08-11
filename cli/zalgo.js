const start = new Date();

const add = require("../zalgo/add");

console.log(`Load time: ${(new Date() - start)}ms`);

const { promptLoop } = require("readline-sync");

console.log(__filename);

promptLoop(inp => {
   console.log(add(inp));
   return false;
});
