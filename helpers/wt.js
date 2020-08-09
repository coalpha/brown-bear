console.log("wink-tokenizer");
const start = new Date();

const tokenizer = require("wink-tokenizer");
const { promptLoop } = require("readline-sync");

const twt = new tokenizer();

console.log(`Load time: ${(new Date() - start)}ms`);

promptLoop(inp => {
   console.log(twt.tokenize(inp).map(t => `[${t.value}]`).join(" "));
   return false;
});
