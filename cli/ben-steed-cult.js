const fs = require("fs");

process.chdir(__dirname);

const BEN_STEED_CULT_TSM = JSON.parse(
   fs.readFileSync("../ben-steed-cult/ben-steed-cult.tag.string.markov.json", "utf8"),
);

const out = ["\0"];
let lastString = "\0";

do {
   let randTagIndex = Math.random() * BEN_STEED_CULT_TSM[lastString].total|0;
   let randTagEntry = null;

   for (const tagEntry of Object.values(BEN_STEED_CULT_TSM[lastString].tags)) {
      if (randTagIndex < tagEntry.total) {
         randTagEntry = tagEntry;
         break;
      } else {
         randTagIndex -= tagEntry.total;
      }
   }

   if (randTagEntry === null) {
      throw new Error("rtg whaaaat");
   }

   let randWordIndex = Math.random() * randTagEntry.total|0;
   let randWord = null;
   for (const [word, probability] of Object.entries(randTagEntry.words)) {
      if (randWordIndex < probability) {
         randWord = word;
         break;
      } else {
         randWordIndex -= probability;
      }
   }

   if (randWord === null) {
      throw new Error("rww whaaaat");
   }

   out.push(randWord);
   lastString = randWord;
} while (lastString !== "\0");

console.log(out.slice(1, -1).join(" "));
