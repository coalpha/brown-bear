const fs = require("fs");
const tag = require("../tagger");

process.chdir(__dirname);

const tmkov = Object.create(null);

const BEN_STEED_CULT = fs.readFileSync(`${__dirname}/source/ben-steed-cult.txt`, "utf8");

const special = {
   value: "\0",
   tag: "null",
   normal: "null",
   pos: "NULL",
   lemma: "null",
};

class WordEntries {
   constructor(o, word) {
      if (o instanceof WordEntries) {
         return o;
      }
      this.total = 0;
      this.word = word;
      this.tags = Object.create(null);
   }
}

class TagEntries {
   constructor(o, tag) {
      if (o instanceof TagEntries) {
         return o;
      }
      this.total = 0;
      this.tag = tag;
      this.words = Object.create(null);
   }

   incrementWord(word) {
      this.words[word] |= 0;
      this.words[word]++;
      this.total++;
   }
}

for (const line of BEN_STEED_CULT.split("\n")) {
   const taggedLine = [special, ...tag(line), special];
   const len = taggedLine.length;
   for (let i = 1; i < len; i++) {
      const lastWord = taggedLine[i - 1].value;
      const { value: thisWord, pos: thisTag } = taggedLine[i];

      const wordEntries
         = tmkov[lastWord]
         = new WordEntries(tmkov[lastWord], lastWord);

      wordEntries.total++;

      const tagEntries
         = wordEntries.tags[thisTag]
         = new TagEntries(wordEntries.tags[thisTag], thisTag);
      tagEntries.incrementWord(thisWord);
   }
}

fs.writeFileSync("ben-steed-cult.tag.string.markov.json", JSON.stringify(tmkov, null, 3));
