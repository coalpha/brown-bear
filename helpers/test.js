const posTagger = require("wink-pos-tagger");
const tagToString = require("./tagToString");

const tagger = posTagger();

tagger.updateLexicon({ "get icced": ["PAIN"] });

console.log(
   tagToString(
      tagger.tagRawTokens(["get icced"])[0],
   ),
);
