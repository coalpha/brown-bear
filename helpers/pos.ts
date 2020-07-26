import * as rl from "readline-sync";
import posTagger from "wink-pos-tagger";

const tagger = posTagger();
rl.promptLoop(inp => {
   const tokens = tagger.tagSentence(inp);
   console.log(tokens.map(token => `${token.normal}::${token.pos}`).join(" "));
   console.log();
   console.log(tokens.map(token => token.lemma || token.normal).join(" "));
   return false;
});
