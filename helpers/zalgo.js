console.log("./zalgo");
const start = new Date();

const add = require("../zalgo/add");
const { promptLoop } = require("readline-sync");

console.log(`Load time: ${(new Date() - start)}ms`);

promptLoop(inp => {
   console.log(add(inp));
   return false;
});
