const { promptLoop } = require("readline-sync");
const posTagger = require("wink-pos-tagger");
const tagToString = require("./tagToString");

const tagger = posTagger();

promptLoop(inp => {
   const tags = tagger.tagSentence(inp);
   console.log(tags.map(tagToString).join(", "));
   console.log();
   console.log(tags.map(token => token.lemma || token.normal).join(" "));
   return false;
});
