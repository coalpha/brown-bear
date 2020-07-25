import partsOfSpeech = require("./partsOfSpeech");
import posTagger = require("wink-pos-tagger");
import cut = require("../util/cut");

type DictStore = { [word: string]: partsOfSpeech.type };

class Dictionary {
   private dict: DictStore = {};

   private tagger = posTagger();

   parseEntry(line: string) {
      const pipeIndex = line.indexOf("|");
      if (pipeIndex === -1) {
         this.dict[line] = this.tagger.tagRawTokens([line])[0].pos;
         return;
      }

      const [words, defs] = cut.cutD(line, pipeIndex);
   }
}
