console.log("wink-pos-tagger");
const start = new Date();

const posTagger = require("wink-pos-tagger");
const { promptLoop } = require("readline-sync");

const tagger = posTagger();

console.log(`Load time: ${(new Date() - start)}ms`);

promptLoop(inp => {
   const tokens = tagger.tagSentence(inp);
   console.log(tokens.map(token => `${token.normal}::${token.pos}`).join(" "));
   console.log();
   console.log(tokens.map(token => token.lemma || token.normal).join(" "));
   return false;
});
