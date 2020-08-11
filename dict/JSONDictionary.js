const fs = require("fs");
const { cutD } = require("../util/cut");
const posTagger = require("wink-pos-tagger");

const pt = posTagger();

module.exports = class JSONDictionary {
   constructor(outfile) {
      this.outfile = outfile;
      this.entries = [];
      this.arrows = [];
   }

   addEntry_o(entry) {
      this.entries.push(entry);
   }

   addEntry_a(wordgroup, tag) {
      this.addEntry_o({
         string: wordgroup,
         tag: tag.toUpperCase(),
         tokentag: "word",
      });
   }

   addArrow(initial, intag, outtag) {
      this.arrows.push({
         string: initial,
         tag_in: intag.toUpperCase(),
         tag_out: outtag.toUpperCase(),
      });
   }

   /**
    * @param {string} line
    */
   addPosLine(line, lineNumber = 0) {
      if (line === "") {
         return;
      }
      console.log(`apl: ${line}`);
      if (!line.includes("|")) {
         this.addEntry_a(line, pt.tagRawTokens([line])[0].pos);
         return;
      }

      if (line.includes("_")) {
         this.addArrowLine(line);
      } else {
         this.addWordLine(line);
      }
   }

   addWordLine(line) {
      console.log(`   awl: ${line}`);
      const pipeIndex = line.indexOf("|");

      const [strWords, strTags] = cutD(line, pipeIndex);
      const words = strWords.split(",");
      const tags = strTags.split(",");
      for (const word of words) {
         for (const tag of tags) {
            this.addEntry_a(word, tag);
         }
         if (word.includes("-")) {
            for (const tag of tags) {
               this.addEntry_a(word.replace(/-/g, " "), tag);
            }
         }
      }
   }

   addArrowLine(line) {
      const typeIndex = line.indexOf("!");
      if (typeIndex === -1) {
         throw new Error("Missing ! in arrow declaration");
      }

      const [initial, types] = cutD(line.replace(/\|!/, "|"), typeIndex - 1);
      const right = types.indexOf("->");
      if (right === -1) {
         throw new Error("missing ->");
      }

      const [intype, outtype] = cutD(types.replace(/->/, "|"), right);
      this.addArrow(initial, intype, outtype);
   }

   close() {
      fs.writeFileSync(this.outfile, JSON.stringify({ tokens: this.entries, arrows: this.arrows }, null, 3));
   }
};
