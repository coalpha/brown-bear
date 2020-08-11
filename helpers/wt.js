const tokenizer = require("wink-tokenizer");
const { promptLoop } = require("readline-sync");

const twt = new tokenizer();

console.log(__filename);

promptLoop(inp => {
   console.log(twt.tokenize(inp).map(t => `[${t.value}]`).join(" "));
   return false;
});
