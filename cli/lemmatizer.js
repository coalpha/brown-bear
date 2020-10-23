const posTagger = require("wink-pos-tagger");
const rl = require("readline-sync");

const tagger = posTagger();

rl.promptLoop(s => {
   console.log(tagger.tagSentence(s).map(q => q.lemma || q.normal).join(" "));
});
