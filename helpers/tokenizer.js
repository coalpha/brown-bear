const { tokenize, tokenizeRaw } = require("../tokenizer");
const tokenToString = require("./tokenToString");
const { promptLoop } = require("readline-sync");

promptLoop(inp => {
   console.log(tokenizeRaw(inp).map(tokenToString).join(", "));
   return false;
});
