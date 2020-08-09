console.log("natural.TreebankWordTokenizer");
const start = new Date();

const { TreebankWordTokenizer, AggressiveTokenizer } = require("natural");
const { promptLoop } = require("readline-sync");

const twt = new TreebankWordTokenizer();

console.log(`Load time: ${(new Date() - start)}ms`);

promptLoop(inp => {
   console.log(twt.tokenize(inp).map(t => `[${t}]`).join(" "));
   return false;
});
