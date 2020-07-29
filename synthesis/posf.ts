import { cutD } from "../util/cut";

/**
 * words only
 * def
 * function
 */

function parseWords(wordsSeparatedByCommas: string): string[] {
   const words = wordsSeparatedByCommas.split(",");
   const out = [];
   for (const word of words) {
      out.push(word);
      if (word.includes("-")) {
         out.push(word.replace(/-/g, ""))
      }
   }
   return out;
}

function 

export default function parseEntry(line: string) {
   const chars = line.split("");

   if (line.includes("_")) {
      // line is a function type
   }

   const pipeIndex = line.indexOf("|");
   const pipeNotExists = pipeIndex === -1;
   if (pipeNotExists) {
      throw new Error("unreachable");
   }

   const [words, defs] = cutD(line, pipeIndex);
   const wordsAry = words.split(",");
}
