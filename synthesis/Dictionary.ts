import partsOfSpeech from "./tagging/partsOfSpeech";
import posTagger from "wink-pos-tagger";
import { cutD } from "../util/cut";

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
