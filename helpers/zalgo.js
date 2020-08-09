const { promptLoop } = require("readline-sync");
const { add } = require("../zalgo");

promptLoop(inp => {
   console.log(add(inp));
   return false;
});
