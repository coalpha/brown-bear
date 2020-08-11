const { gstokenize } = require("../tokenizer");
const tokenToString = require("./tokenToString");
const { promptLoop } = require("readline-sync");

promptLoop(inp => {
   console.log(gstokenize(inp).map(s => `[${s}]`).join(" "));
   return false;
});
